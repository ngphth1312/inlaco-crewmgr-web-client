import React, { useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  HorizontalImageInput,
  EditableDataGrid,
} from "../components/global";
import { NationalityTextField } from "../components/mobilization";
import { FileUploadField } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation, useParams } from "react-router";
import * as XLSX from "xlsx";
import { formatDate } from "../utils/ValueConverter";

const MobilizationDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  // const isAdmin = location.state?.isAdmin;
  const isAdmin = false;

  // useEffect(() => {
  //   fetchMobilizationInfos(id);
  // },[]);

  const initialValues = {
    compName: "",
    numOfMobilizedCrew: "",
    mobilizationInfo: {
      timeOfDeparture: "",
      departureLocation: "",
      UN_LOCODE_DepartureLocation: "",

      estimatedTimeOfArrival: "",
      arrivalLocation: "",
      UN_LOCODE_ArrivalLocation: "",

      shipImage: "",
      shipIMO: "",
      shipName: "",
      shipNationality: "",
      shipType: "",
    },

    mobilizedCrewMembers: [],
  };

  const mobilizationSchema = yup.object().shape({
    compName: yup.string().required("Tên công ty không được để trống"),
    numOfMobilizedCrew: yup
      .number()
      .min(1, "Tổng số nhân lực cần điều động không hợp lệ")
      .required("Tổng số nhân lực cần điều động không được để trống"),

    mobilizationInfo: yup.object().shape({
      timeOfDeparture: yup
        .date()
        .max(new Date(), "Thời gian khởi hành không hợp lệ")
        .required("Thời gian khởi hành dự kiến không được để trống")
        .test(
          "is-before-end-datetime",
          "Thời gian khởi hành phải trước thời gian đến nơi dự kiến",
          function (value) {
            const { estimatedTimeOfArrival } = this.parent; // Access sibling field estimatedTimeOfArrival
            return !estimatedTimeOfArrival || value < estimatedTimeOfArrival;
          }
        ),
      UN_LOCODE_DepartureLocation: yup
        .string()
        .required("UN/LOCODE điểm khởi hành không được để trống"),
      departureLocation: yup
        .string()
        .required("Tên điểm khởi hành không được để trống"),

      estimatedTimeOfArrival: yup
        .date()
        .required("Thời gian đến nơi dự kiến không được để trống")
        .test(
          "is-after-start-datetime",
          "Thời gian đến nơi dự kiến phải sau thời gian khởi hành",
          function (value) {
            const { timeOfDeparture } = this.parent; // Access sibling field timeOfDeparture
            return !timeOfDeparture || value > timeOfDeparture;
          }
        ),
      UN_LOCODE_ArrivalLocation: yup
        .string()
        .required("UN/LOCODE điểm đến không được để trống"),
      arrivalLocation: yup
        .string()
        .required("Tên điểm đến không được để trống"),
    }),
  });

  //   const [createMobilizationLoading, setCreateMobilizationLoading] =
  //     useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };

  const handleSaveMobilizationSubmit = async (values) => {
    // setCreateMobilizationLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully saving update: ", values);
      setIsEditable(false);
    } catch (err) {
      console.log("Error when saving editing mobilization: ", err);
    } finally {
      //   setCreateMobilizationLoading(false);
    }
  };

  const handleDownloadExcel = (values) => {
    // Define the headers in Vietnamese
    const columnHeaders = [
      { header: "Mã thuyền viên", key: "crewID" },
      { header: "Họ và tên", key: "fullName" },
      { header: "Ngày sinh", key: "dob" },
      { header: "Số điện thoại", key: "phoneNumber" },
      { header: "Chức vụ", key: "positionName" },
    ];

    // Map the data to include only the keys defined in headers
    const crewMembers = values.mobilizedCrewMembers.map((member) => ({
      crewID: member.crewID,
      fullName: member.fullName,
      dob: formatDate(member.dob),
      phoneNumber: member.phoneNumber,
      positionName: member.positionName,
    }));

    // Create an array with the headers and data
    const data = [
      columnHeaders.map((columnHeader) => columnHeader.header), // Add headers as the first row
      ...crewMembers.map((member) =>
        columnHeaders.map((columnHeader) => member[columnHeader.key])
      ), // Add data rows
    ];

    // Convert the array to a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách thuyền viên");

    // Write the workbook to a file
    XLSX.writeFile(workbook, "danh-sach-thuyen-vien-duoc-dieu-dong.xlsx");
    console.log("Download excel file successfully");
  };


  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={mobilizationSchema}
        onSubmit={handleSaveMobilizationSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Box m="20px" component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <PageTitle
                  title="CHI TIẾT ĐIỀU ĐỘNG"
                  subtitle={"Thông tin chi tiết của điều động"}
                />
                {isAdmin && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      marginRight: 2,
                    }}
                  >
                    {isEditable ? (
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            color: COLOR.primary_orange,
                            padding: "8px",
                            marginRight: 2,
                            borderColor: COLOR.primary_orange,
                          }}
                          onClick={handleCancelClick}
                        >
                          <Box sx={{ display: "flex", alignItems: "end" }}>
                            <DeleteForeverRoundedIcon
                              sx={{
                                width: 20,
                                height: 20,
                                marginRight: "2px",
                                marginBottom: "2px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              Hủy
                            </Typography>
                          </Box>
                        </Button>
                        <Button
                          variant="contained"
                          type={"submit"}
                          disabled={!isValid || !dirty}
                          sx={{
                            color: COLOR.primary_white,
                            backgroundColor: COLOR.primary_blue,
                            padding: "10px",
                            marginTop: "1px",
                            marginBottom: "1px",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "end" }}>
                            <SaveIcon
                              sx={{
                                width: 20,
                                height: 20,
                                marginRight: "2px",
                                marginBottom: "2px",
                              }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              Lưu
                            </Typography>
                          </Box>
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        type={"button"}
                        sx={{
                          color: COLOR.primary_black,
                          backgroundColor: COLOR.primary_gold,
                          padding: "10px",
                          marginTop: "1px",
                          marginBottom: "1px",
                        }}
                        onClick={handleEditClick}
                      >
                        <Box sx={{ display: "flex", alignItems: "end" }}>
                          <EditIcon
                            sx={{
                              width: 20,
                              height: 20,
                              marginRight: "2px",
                              marginBottom: "2px",
                            }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: COLOR.primary_black,
                            }}
                          >
                            Chỉnh sửa
                          </Typography>
                        </Box>
                      </Button>
                    )}
                  </Box>
                )}
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty}
                    sx={{
                      width: "10%",
                      padding: 1,
                      color: COLOR.primary_black,
                      backgroundColor: COLOR.primary_gold,
                      minWidth: 130,
                    }}
                  >
                    {createMobilizationLoading ? (
                      <CircularProgress size={24} color={COLOR.primary_black} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        <PersonAddIcon
                          sx={{ marginRight: "5px", marginBottom: "1px" }}
                        />
                        <Typography sx={{ fontWeight: 700 }}>Thêm</Typography>
                      </Box>
                    )}
                  </Button>
                </Box> */}
              </Box>
            </Box>
            <SectionDivider sectionName="Thông tin chung*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={5}>
                <InfoTextField
                  id="comp-name"
                  label="Điều động đến công ty"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="compName"
                  value={values.compName}
                  error={!!touched.compName && !!errors.compName}
                  helperText={
                    touched.compName && errors.compName ? errors.compName : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              {isAdmin && (
                <Grid size={4}>
                  <InfoTextField
                    id="num-of-crew-member"
                    type="number"
                    label="Tổng số nhân lực cần điều động"
                    size="small"
                    margin="none"
                    disabled={!isEditable}
                    required
                    fullWidth
                    name="numOfMobilizedCrew"
                    value={values.numOfMobilizedCrew}
                    error={
                      !!touched.numOfMobilizedCrew &&
                      !!errors.numOfMobilizedCrew
                    }
                    helperText={
                      touched.numOfMobilizedCrew && errors.numOfMobilizedCrew
                        ? errors.numOfMobilizedCrew
                        : " "
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">người</InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
              )}
            </Grid>
            <SectionDivider sectionName="Thông tin điều động*: " />
            <Typography
              sx={{
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              Lịch trình dự kiến:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="time-of-departure"
                  type="datetime-local"
                  required
                  label="Thời gian khởi hành dự kiến"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.timeOfDeparture"
                  value={values.mobilizationInfo?.timeOfDeparture}
                  error={
                    !!touched.mobilizationInfo?.timeOfDeparture &&
                    !!errors.mobilizationInfo?.timeOfDeparture
                  }
                  helperText={
                    touched.mobilizationInfo?.timeOfDeparture &&
                    errors.mobilizationInfo?.timeOfDeparture
                      ? errors.mobilizationInfo?.timeOfDeparture
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="arrival-location"
                  label="UN/LOCODE điểm khởi hành"
                  required
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.UN_LOCODE_DepartureLocation"
                  value={values.mobilizationInfo?.UN_LOCODE_DepartureLocation}
                  error={
                    !!touched.mobilizationInfo?.UN_LOCODE_DepartureLocation &&
                    !!errors.mobilizationInfo?.UN_LOCODE_DepartureLocation
                  }
                  helperText={
                    touched.mobilizationInfo?.UN_LOCODE_DepartureLocation &&
                    errors.mobilizationInfo?.UN_LOCODE_DepartureLocation
                      ? errors.mobilizationInfo?.UN_LOCODE_DepartureLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="departure-location"
                  label="Tên điểm khởi hành"
                  required
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.departureLocation"
                  value={values.mobilizationInfo?.departureLocation}
                  error={
                    !!touched.mobilizationInfo?.departureLocation &&
                    !!errors.mobilizationInfo?.departureLocation
                  }
                  helperText={
                    touched.mobilizationInfo?.departureLocation &&
                    errors.mobilizationInfo?.departureLocation
                      ? errors.mobilizationInfo?.departureLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="estimated-time-of-arrival"
                  type="datetime-local"
                  required
                  label="Thời gian đến nơi dự kiến"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.estimatedTimeOfArrival"
                  value={values.mobilizationInfo?.estimatedTimeOfArrival}
                  error={
                    !!touched.mobilizationInfo?.estimatedTimeOfArrival &&
                    !!errors.mobilizationInfo?.estimatedTimeOfArrival
                  }
                  helperText={
                    touched.mobilizationInfo?.estimatedTimeOfArrival &&
                    errors.mobilizationInfo?.estimatedTimeOfArrival
                      ? errors.mobilizationInfo?.estimatedTimeOfArrival
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="arrival-location"
                  label="UN/LOCODE điểm đến"
                  required
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.UN_LOCODE_ArrivalLocation"
                  value={values.mobilizationInfo?.UN_LOCODE_ArrivalLocation}
                  error={
                    !!touched.mobilizationInfo?.UN_LOCODE_ArrivalLocation &&
                    !!errors.mobilizationInfo?.UN_LOCODE_ArrivalLocation
                  }
                  helperText={
                    touched.mobilizationInfo?.UN_LOCODE_ArrivalLocation &&
                    errors.mobilizationInfo?.UN_LOCODE_ArrivalLocation
                      ? errors.mobilizationInfo?.UN_LOCODE_ArrivalLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="arrival-location"
                  label="Tên điểm đến"
                  required
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.arrivalLocation"
                  value={values.mobilizationInfo?.arrivalLocation}
                  error={
                    !!touched.mobilizationInfo?.arrivalLocation &&
                    !!errors.mobilizationInfo?.arrivalLocation
                  }
                  helperText={
                    touched.mobilizationInfo?.arrivalLocation &&
                    errors.mobilizationInfo?.arrivalLocation
                      ? errors.mobilizationInfo?.arrivalLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Typography
              sx={{
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              Thông tin Tàu:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid
                size={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <HorizontalImageInput
                  id="social-ins-image"
                  disabled={!isEditable}
                  width={300}
                  height={180}
                  name="mobilizationInfo.shipImage"
                  sx={{ marginBottom: 2 }}
                  onClick={() =>
                    document.getElementById("social-ins-image").click()
                  }
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="ship-imo"
                  label="IMO"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.shipIMO"
                  value={values.mobilizationInfo?.shipIMO}
                  error={
                    !!touched.mobilizationInfo?.shipIMO &&
                    !!errors.mobilizationInfo?.shipIMO
                  }
                  helperText={
                    touched.mobilizationInfo?.shipIMO &&
                    errors.mobilizationInfo?.shipIMO
                      ? errors.mobilizationInfo?.shipIMO
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="ship-name"
                  label="Tên tàu"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.shipName"
                  value={values.mobilizationInfo?.shipName}
                  error={
                    !!touched.mobilizationInfo?.shipName &&
                    !!errors.mobilizationInfo?.shipName
                  }
                  helperText={
                    touched.mobilizationInfo?.shipName &&
                    errors.mobilizationInfo?.shipName
                      ? errors.mobilizationInfo?.shipName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={2}>
                <NationalityTextField
                  id="ship-nationality"
                  label="Quốc tịch"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.shipNationality"
                  value={values.mobilizationInfo?.shipNationality}
                  error={
                    !!touched.mobilizationInfo?.shipNationality &&
                    !!errors.mobilizationInfo?.shipNationality
                  }
                  helperText={
                    touched.mobilizationInfo?.shipNationality &&
                    errors.mobilizationInfo?.shipNationality
                      ? errors.mobilizationInfo?.shipNationality
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="ship-type"
                  label="Loại tàu"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="mobilizationInfo.shipType"
                  value={values.mobilizationInfo?.shipType}
                  error={
                    !!touched.mobilizationInfo?.shipType &&
                    !!errors.mobilizationInfo?.shipType
                  }
                  helperText={
                    touched.mobilizationInfo?.shipType &&
                    errors.mobilizationInfo?.shipType
                      ? errors.mobilizationInfo?.shipType
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
              </Grid>
            </Grid>
            {isAdmin && (
              <>
                <SectionDivider sectionName="Danh sách thuyền viên được điều động*: " />
                {!isEditable && (
                  <Box sx={{ display: "flex", justifyContent: "end" }} px={2}>
                    <Button
                      variant="contained"
                      type="button"
                      sx={{
                        color: COLOR.primary_black,
                        backgroundColor: COLOR.primary_gold,
                        padding: "10px",
                        marginTop: "1px",
                        marginBottom: "1px",
                      }}
                      onClick={() => handleDownloadExcel(values)}
                    >
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        <FileDownloadRoundedIcon
                          sx={{
                            width: 20,
                            height: 20,
                            marginRight: "4px",
                            marginBottom: "1px",
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 14,
                          }}
                        >
                          Tải xuống File Excel
                        </Typography>
                      </Box>
                    </Button>
                  </Box>
                )}
                <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
                  <Grid size={12}>
                    <EditableDataGrid
                      name="mobilizedCrewMembers"
                      initialIsEditable={false} //this must be set to false and when working with the disabled prop below to achieve the desired behavior
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default MobilizationDetail;

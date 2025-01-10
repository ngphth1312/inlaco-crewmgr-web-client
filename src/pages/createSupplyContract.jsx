import React, { useState } from "react";
import { PageTitle, SectionDivider, InfoTextField } from "../components/global";
import { FileUploadField } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { COLOR } from "../assets/Color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router";

const CreateSupplyContract = () => {
  // const navigate = useNavigate();

  const initialValues = {
    contractFile: null,
    partyA: {
      cardPhoto: "",
      compName: "Công ty INLACO Hải Phòng",
      compAddress: "",
      compPhoneNumber: "",
      representative: "",
      representativePos: "Trưởng phòng Nhân sự",
    },
    partyB: {
      cardPhoto: "",
      compName: "",
      compAddress: "",
      compPhoneNumber: "",
      representative: "",
      representativePos: "",
    },
    contractInfo: {
      startDate: "",
      endDate: "",
      numOfCrewMember: "",
      timeOfDeparture: "",
      departureLocation: "",
      estimatedTimeOfArrival: "",
      arrivalLocation: "",
    },
  };

  const phoneRegex =
    "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
  const ciNumberRegex = "^\\d{12}$";

  const crewContractSchema = yup.object().shape({
    partyA: yup.object().shape({
      compName: yup.string().required("Tên công ty không được để trống"),
      compAddress: yup.string().required("Địa chỉ không được để trống"),

      compPhoneNumber: yup
        .string()
        .matches(phoneRegex, "SĐT không hợp lệ")
        .required("SĐT không được để trống"),

      representative: yup
        .string()
        .required("Người đại diện không được để trống"),

      representativePos: yup.string().required("Chức vụ không được để trống"),
    }),

    partyB: yup.object().shape({
      compName: yup.string().required("Tên công ty không được để trống"),
      compAddress: yup.string().required("Địa chỉ không được để trống"),

      compPhoneNumber: yup
        .string()
        .matches(phoneRegex, "SĐT không hợp lệ")
        .required("SĐT không được để trống"),

      representative: yup
        .string()
        .required("Người đại diện không được để trống"),

      representativePos: yup.string().required("Chức vụ không được để trống"),
    }),

    contractInfo: yup.object().shape({
      startDate: yup
        .date()
        .max(new Date(), "Ngày bắt đầu không hợp lệ")
        .required("Ngày bắt đầu không được để trống")
        .test(
          "is-before-end-date",
          "Ngày bắt đầu phải trước ngày kết thúc",
          function (value) {
            const { endDate } = this.parent; // Access sibling field endDate
            return !endDate || value < endDate;
          }
        ),

      endDate: yup
        .date()
        .required("Ngày kết thúc không được để trống")
        .test(
          "is-after-start-date",
          "Ngày kết thúc phải sau ngày bắt đầu",
          function (value) {
            const { startDate } = this.parent; // Access sibling field startDate
            return !startDate || value > startDate;
          }
        ),

      numOfCrewMember: yup
        .number()
        .min(1, "Tổng số nhân lực cần cung ứng không hợp lệ")
        .required("Tổng số nhân lực cần cung ứng không được để trống"),

      timeOfDeparture: yup
        .date()
        .max(new Date(), "Thời gian khởi hành không hợp lệ")
        .test(
          "is-before-end-datetime",
          "Thời gian khởi hành phải trước thời gian đến nơi dự kiến",
          function (value) {
            const { estimatedTimeOfArrival } = this.parent; // Access sibling field estimatedTimeOfArrival
            return !estimatedTimeOfArrival || value < estimatedTimeOfArrival;
          }
        ),

      estimatedTimeOfArrival: yup
        .date()
        .test(
          "is-after-start-datetime",
          "Thời gian đến nơi dự kiến phải sau thời gian khởi hành",
          function (value) {
            const { timeOfDeparture } = this.parent; // Access sibling field timeOfDeparture
            return !timeOfDeparture || value > timeOfDeparture;
          }
        ),
    }),
  });

  const [addCrewLoading, setAddCrewLoading] = useState(false);

  const handleCreateCrewContractSubmit = async (values, { resetForm }) => {
    setAddCrewLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch (err) {
      console.log("Error when creating crew contract: ", err);
    } finally {
      setAddCrewLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={crewContractSchema}
        onSubmit={handleCreateCrewContractSubmit}
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
                  title="TẠO HỢP ĐỒNG CUNG ỨNG THUYỀN VIÊN"
                  subtitle="Tạo và lưu Hợp đồng cung ứng thuyền viên mới vào hệ thống"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
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
                    {addCrewLoading ? (
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
                  <FileUploadField name="contractFileLink" />
                </Box>
              </Box>
            </Box>
            <SectionDivider sectionName="Công ty Cung ứng lao động (Bên A)*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="company-name"
                  label="Tên công ty"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyA.compName"
                  value={values.partyA?.compName}
                  error={
                    !!touched.partyA?.compName && !!errors.partyA?.compName
                  }
                  helperText={
                    touched.partyA?.compName && errors.partyA?.compName
                      ? errors.partyA?.compName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="company-address"
                  label="Địa chỉ"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyA.compAddress"
                  value={values.partyA?.compAddress}
                  error={
                    !!touched.partyA?.compAddress &&
                    !!errors.partyA?.compAddress
                  }
                  helperText={
                    touched.partyA?.compAddress && errors.partyA?.compAddress
                      ? errors.partyA?.compAddress
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="company-phone-number"
                  label="Số điện thoại"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyA.compPhoneNumber"
                  value={values.partyA?.compPhoneNumber}
                  error={
                    !!touched.partyA?.compPhoneNumber &&
                    !!errors.partyA?.compPhoneNumber
                  }
                  helperText={
                    touched.partyA?.compPhoneNumber &&
                    errors.partyA?.compPhoneNumber
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="representative"
                  label="Người đại diện"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyA.representative"
                  value={values.partyA?.representative}
                  error={
                    !!touched.partyA?.representative &&
                    !!errors.partyA?.representative
                  }
                  helperText={
                    touched.partyA?.representative &&
                    errors.partyA?.representative
                      ? errors.partyA?.representative
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="representative-position"
                  label="Chức vụ"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyA.representativePos"
                  value={values.partyA?.representativePos}
                  error={
                    !!touched.partyA?.representativePos &&
                    !!errors.partyA?.representativePos
                  }
                  helperText={
                    touched.partyA?.representativePos &&
                    errors.partyA?.representativePos
                      ? errors.partyA?.representativePos
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Công ty yêu cầu Cung ứng lao động (Bên B)*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="company-name"
                  label="Tên công ty"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.compName"
                  value={values.partyB?.compName}
                  error={
                    !!touched.partyB?.compName && !!errors.partyB?.compName
                  }
                  helperText={
                    touched.partyB?.compName && errors.partyB?.compName
                      ? errors.partyB?.compName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  id="company-address"
                  label="Địa chỉ"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.compAddress"
                  value={values.partyB?.compAddress}
                  error={
                    !!touched.partyB?.compAddress &&
                    !!errors.partyB?.compAddress
                  }
                  helperText={
                    touched.partyB?.compAddress && errors.partyB?.compAddress
                      ? errors.partyB?.compAddress
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="company-phone-number"
                  label="Số điện thoại"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.compPhoneNumber"
                  value={values.partyB?.compPhoneNumber}
                  error={
                    !!touched.partyB?.compPhoneNumber &&
                    !!errors.partyB?.compPhoneNumber
                  }
                  helperText={
                    touched.partyB?.compPhoneNumber &&
                    errors.partyB?.compPhoneNumber
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="representative"
                  label="Người đại diện"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.representative"
                  value={values.partyB?.representative}
                  error={
                    !!touched.partyB?.representative &&
                    !!errors.partyB?.representative
                  }
                  helperText={
                    touched.partyB?.representative &&
                    errors.partyB?.representative
                      ? errors.partyB?.representative
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="representative-position"
                  label="Chức vụ"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.representativePos"
                  value={values.partyB?.representativePos}
                  error={
                    !!touched.partyB?.representativePos &&
                    !!errors.partyB?.representativePos
                  }
                  helperText={
                    touched.partyB?.representativePos &&
                    errors.partyB?.representativePos
                      ? errors.partyB?.representativePos
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Thông tin hợp đồng*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={3}>
                <InfoTextField
                  id="start-date"
                  type="date"
                  label="Ngày bắt đầu"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="contractInfo.startDate"
                  value={values.contractInfo?.startDate}
                  error={
                    !!touched.contractInfo?.startDate &&
                    !!errors.contractInfo?.startDate
                  }
                  helperText={
                    touched.contractInfo?.startDate &&
                    errors.contractInfo?.startDate
                      ? errors.contractInfo?.startDate
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="end-date"
                  type="date"
                  label="Ngày kết thúc"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="contractInfo.endDate"
                  value={values.contractInfo?.endDate}
                  error={
                    !!touched.contractInfo?.endDate &&
                    !!errors.contractInfo?.endDate
                  }
                  helperText={
                    touched.contractInfo?.endDate &&
                    errors.contractInfo?.endDate
                      ? errors.contractInfo?.endDate
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="num-of-crew-member"
                  type="number"
                  label="Tổng số nhân lực cần cung ứng"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="contractInfo.numOfCrewMember"
                  value={values.contractInfo?.numOfCrewMember}
                  error={
                    !!touched.contractInfo?.numOfCrewMember &&
                    !!errors.contractInfo?.numOfCrewMember
                  }
                  helperText={
                    touched.contractInfo?.numOfCrewMember &&
                    errors.contractInfo?.numOfCrewMember
                      ? errors.contractInfo?.numOfCrewMember
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
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
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
              Lịch trình dự kiến:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="time-of-departure"
                  type="date"
                  label="Thời gian khởi hành dự kiến"
                  size="small"
                  margin="none"
                  fullWidth
                  name="contractInfo.timeOfDeparture"
                  value={values.contractInfo?.timeOfDeparture}
                  error={
                    !!touched.contractInfo?.timeOfDeparture &&
                    !!errors.contractInfo?.timeOfDeparture
                  }
                  helperText={
                    touched.contractInfo?.timeOfDeparture &&
                    errors.contractInfo?.timeOfDeparture
                      ? errors.contractInfo?.timeOfDeparture
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={8}>
                <InfoTextField
                  id="departure-location"
                  label="Địa điểm xuất phát"
                  size="small"
                  margin="none"
                  fullWidth
                  name="contractInfo.departureLocation"
                  value={values.contractInfo?.departureLocation}
                  error={
                    !!touched.contractInfo?.departureLocation &&
                    !!errors.contractInfo?.departureLocation
                  }
                  helperText={
                    touched.contractInfo?.departureLocation &&
                    errors.contractInfo?.departureLocation
                      ? errors.contractInfo?.departureLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="estimated-time-of-arrival"
                  type="date"
                  label="Thời gian đến nơi dự kiến"
                  size="small"
                  margin="none"
                  fullWidth
                  name="contractInfo.estimatedTimeOfArrival"
                  value={values.contractInfo?.estimatedTimeOfArrival}
                  error={
                    !!touched.contractInfo?.estimatedTimeOfArrival &&
                    !!errors.contractInfo?.estimatedTimeOfArrival
                  }
                  helperText={
                    touched.contractInfo?.estimatedTimeOfArrival &&
                    errors.contractInfo?.estimatedTimeOfArrival
                      ? errors.contractInfo?.estimatedTimeOfArrival
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={8}>
                <InfoTextField
                  id="arrival-location"
                  label="Địa điểm đến"
                  size="small"
                  margin="none"
                  fullWidth
                  name="contractInfo.arrivalLocation"
                  value={values.contractInfo?.arrivalLocation}
                  error={
                    !!touched.contractInfo?.arrivalLocation &&
                    !!errors.contractInfo?.arrivalLocation
                  }
                  helperText={
                    touched.contractInfo?.arrivalLocation &&
                    errors.contractInfo?.arrivalLocation
                      ? errors.contractInfo?.arrivalLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CreateSupplyContract;

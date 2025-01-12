import React, { useEffect, useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  HorizontalImageInput,
} from "../components/global";
import { CardPhotoInput } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveIcon from "@mui/icons-material/Save";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

const CrewMemberDetail = () => {
  // const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   fetchCrewMemberInfos(id);
  // },[]);

  const paymentStatus = ["Đã thanh toán", "Chưa thanh toán"];

  const genders = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];

  const initialValues = {
    cardPhoto: "",
    fullName: "",
    dob: "",
    ciNumber: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",

    jobInfo: {
      startDate: "",
      endDate: "",
      workingLocation: "Địa điểm làm việc sẽ được thông báo sau",
      position: "",
      jobDescription: "",
    },

    insuranceInfo: {
      socialInsID: "",
      socialInsStartDate: "",
      socialInsEndDate: "",
      socialInsImage: "",
      socialInsStatus: "Chưa thanh toán",

      accidentInsID: "",
      accidentInsStartDate: "",
      accidentInsEndDate: "",
      accidentInsImage: "",
      accidentInsStatus: "Chưa thanh toán",

      healthInsID: "",
      healthInsStartDate: "",
      healthInsEndDate: "",
      healthInsImage: "",
      healthInsStatus: "Chưa thanh toán",
      healthInsHospital: "",
    },
  };

  const phoneRegex =
    "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
  const ciNumberRegex = "^\\d{12}$";

  const crewMemberInfosSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),
    dob: yup
      .date()
      .max(new Date(), "Ngày sinh không hợp lệ")
      .required("Ngày sinh không được để trống"),

    ciNumber: yup
      .string()
      .matches(ciNumberRegex, "Số CCCD không hợp lệ")
      .required("Số căn cước công dân không được để trống"),

    gender: yup.string().required("Vui lòng chọn giới tính"),
    address: yup.string().required("Địa chỉ không được để trống"),

    phoneNumber: yup
      .string()
      .matches(phoneRegex, "SĐT không hợp lệ")
      .required("SĐT không được để trống"),

    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),

    jobInfo: yup.object().shape({
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
    
          workingLocation: yup
            .string()
            .required("Địa điểm làm việc không được để trống"),
          position: yup.string().required("Vị trí chuyên môn không được để trống"),
          jobDescription: yup
            .string()
            .required("Mô tả công việc không được để trống"),
        }),

    insuranceInfo: yup.object().shape({
      // BHXH:
      socialInsStartDate: yup
        .date()
        .max(new Date(), "Ngày bắt đầu không hợp lệ")
        .test(
          "is-before-end-date",
          "Ngày bắt đầu phải trước ngày kết thúc",
          function (value) {
            const { socialInsEndDate } = this.parent; // Access sibling field socialInsEndDate
            return !socialInsEndDate || value < socialInsEndDate;
          }
        ),
      socialInsEndDate: yup
        .date()
        .test(
          "is-after-start-date",
          "Ngày kết thúc phải sau ngày bắt đầu",
          function (value) {
            const { socialInsStartDate } = this.parent; // Access sibling field socialInsStartDate
            return !socialInsStartDate || value > socialInsStartDate;
          }
        ),
      // BHTN:
      accidentInsStartDate: yup
        .date()
        .max(new Date(), "Ngày bắt đầu không hợp lệ")
        .test(
          "is-before-end-date",
          "Ngày bắt đầu phải trước ngày kết thúc",
          function (value) {
            const { accidentInsEndDate } = this.parent; // Access sibling field accidentInsEndDate
            return !accidentInsEndDate || value < accidentInsEndDate;
          }
        ),
      accidentInsEndDate: yup
        .date()
        .test(
          "is-after-start-date",
          "Ngày kết thúc phải sau ngày bắt đầu",
          function (value) {
            const { accidentInsStartDate } = this.parent; // Access sibling field accidentInsStartDate
            return !accidentInsStartDate || value > accidentInsStartDate;
          }
        ),
      // BHYT:
      healthInsStartDate: yup
        .date()
        .max(new Date(), "Ngày bắt đầu không hợp lệ")
        .test(
          "is-before-end-date",
          "Ngày bắt đầu phải trước ngày kết thúc",
          function (value) {
            const { healthInsEndDate } = this.parent; // Access sibling field healthInsEndDate
            return !healthInsEndDate || value < healthInsEndDate;
          }
        ),
      healthInsEndDate: yup
        .date()
        .test(
          "is-after-start-date",
          "Ngày kết thúc phải sau ngày bắt đầu",
          function (value) {
            const { healthInsStartDate } = this.parent; // Access sibling field healthInsStartDate
            return !healthInsStartDate || value > healthInsStartDate;
          }
        ),
    }),
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    // console.log(rows);
    setIsEditable(false);
    // setFieldValue(name, rows);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };


  const handleSaveCrewMemberSubmit = async (values, { resetForm }) => {
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch (err) {
      console.log("Error when saving crew member info: ", err);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={crewMemberInfosSchema}
        onSubmit={handleSaveCrewMemberSubmit}
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
                  title="CHI TIẾT THUYỀN VIÊN"
                  subtitle={`Mã thuyền viên: ${id}`} //Change this to the actual crew ID, this currently display an id, not crewID
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    marginRight: 2,
                  }}
                >
                  {isEditable && (
                    <Button
                      variant="outlined"
                      sx={{
                        padding: 1,
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
                  )}
                  <Button
                    variant="contained"
                    sx={{
                      padding: 1,
                      color: COLOR.primary_black,
                      backgroundColor: isEditable
                        ? COLOR.primary_blue
                        : COLOR.primary_gold,
                      padding: "10px",
                      marginTop: "1px",
                      marginBottom: "1px",
                    }}
                    onClick={
                      isEditable
                        ? handleSaveClick
                        : handleEditClick
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "end" }}>
                      {isEditable ? (
                        <SaveIcon
                          sx={{
                            width: 20,
                            height: 20,
                            marginRight: "2px",
                            marginBottom: "2px",
                            color: COLOR.primary_white,
                          }}
                        />
                      ) : (
                        <EditIcon
                          sx={{
                            width: 20,
                            height: 20,
                            marginRight: "2px",
                            marginBottom: "2px",
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: isEditable
                            ? COLOR.primary_white
                            : COLOR.primary_black,
                        }}
                      >
                        {isEditable ? "Lưu" : "Chỉnh sửa"}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
              <CardPhotoInput
                id="card-photo"
                name="cardPhoto"
                disabled={!isEditable}
                sx={{ marginRight: "10px" }}
                onClick={() => document.getElementById("card-photo").click()}
              />
            </Box>
            <SectionDivider my={3} sectionName="Thông tin cá nhân*: " sx={{}} />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="full-name"
                  label="Họ và tên"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="fullName"
                  value={values.fullName}
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={
                    touched.fullName && errors.fullName ? errors.fullName : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  type="date"
                  id="dob"
                  label="Ngày sinh"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="dob"
                  value={values.dob}
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
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
                  id="ci-number"
                  label="Số Căn cước công dân"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="ciNumber"
                  value={values.ciNumber}
                  error={!!touched.ciNumber && !!errors.ciNumber}
                  helperText={touched.ciNumber && errors.ciNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  select
                  id="gender"
                  label="Giới tính"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="gender"
                  value={values.gender}
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={7}>
                <InfoTextField
                  id="address"
                  label="Địa chỉ"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="address"
                  value={values.address}
                  error={!!touched.address && !!errors.address}
                  helperText={
                    touched.address && errors.address ? errors.address : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="email"
                  label="Email"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="email"
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={2}>
                <InfoTextField
                  id="phone-number"
                  label="Số điện thoại"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="phoneNumber"
                  value={values.phoneNumber}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Thông tin công việc: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={3}>
                <InfoTextField
                  id="start-date"
                  type="date"
                  label="Ngày bắt đầu"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="jobInfo.startDate"
                  value={values.jobInfo?.startDate}
                  error={
                    !!touched.jobInfo?.startDate && !!errors.jobInfo?.startDate
                  }
                  helperText={
                    touched.jobInfo?.startDate && errors.jobInfo?.startDate
                      ? errors.jobInfo?.startDate
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
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
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="jobInfo.endDate"
                  value={values.jobInfo?.endDate}
                  error={
                    !!touched.jobInfo?.endDate && !!errors.jobInfo?.endDate
                  }
                  helperText={
                    touched.jobInfo?.endDate && errors.jobInfo?.endDate
                      ? errors.jobInfo?.endDate
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="working-location"
                  label="Địa điểm làm việc"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="jobInfo.workingLocation"
                  value={values.jobInfo?.workingLocation}
                  error={
                    !!touched.jobInfo?.workingLocation &&
                    !!errors.jobInfo?.workingLocation
                  }
                  helperText={
                    touched.jobInfo?.workingLocation &&
                    errors.jobInfo?.workingLocation
                      ? errors.jobInfo?.workingLocation
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="position"
                  label="Vị trí chuyên môn"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="jobInfo.position"
                  value={values.jobInfo?.position}
                  error={
                    !!touched.jobInfo?.position && !!errors.jobInfo?.position
                  }
                  helperText={
                    touched.jobInfo?.position && errors.jobInfo?.position
                      ? errors.jobInfo?.position
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={12}>
                <InfoTextField
                  id="job-description"
                  label="Mô tả công việc"
                  rows={6}
                  multiline
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="jobInfo.jobDescription"
                  value={values.jobInfo?.jobDescription}
                  error={
                    !!touched.jobInfo?.jobDescription &&
                    !!errors.jobInfo?.jobDescription
                  }
                  helperText={
                    touched.jobInfo?.jobDescription &&
                    errors.jobInfo?.jobDescription
                      ? errors.jobInfo?.jobDescription
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Thông tin Bảo hiểm: " />
            {/* BHXH */}
            <Typography
              sx={{
                mt: 1,
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              1. Bảo hiểm Xã hội:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  // id=""
                  label="Mã số BHXH"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="insuranceInfo.socialInsID"
                  value={values.insuranceInfo?.socialInsID}
                  error={
                    !!touched.insuranceInfo?.socialInsID &&
                    !!errors.insuranceInfo?.socialInsID
                  }
                  helperText={
                    touched.insuranceInfo?.socialInsID &&
                    errors.insuranceInfo?.socialInsID
                      ? errors.insuranceInfo?.socialInsID
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ngày tham gia"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.socialInsStartDate"
                  value={values.insuranceInfo?.socialInsStartDate}
                  error={
                    !!touched.insuranceInfo?.socialInsStartDate &&
                    !!errors.insuranceInfo?.socialInsStartDate
                  }
                  helperText={
                    touched.insuranceInfo?.socialInsStartDate &&
                    errors.insuranceInfo?.socialInsStartDate
                      ? errors.insuranceInfo?.socialInsStartDate
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.socialInsEndDate"
                  value={values.insuranceInfo?.socialInsEndDate}
                  error={
                    !!touched.insuranceInfo?.socialInsEndDate &&
                    !!errors.insuranceInfo?.socialInsEndDate
                  }
                  helperText={
                    touched.insuranceInfo?.socialInsEndDate &&
                    errors.insuranceInfo?.socialInsEndDate
                      ? errors.insuranceInfo?.socialInsEndDate
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
              <Grid size={2}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Trạng thái"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  select
                  fullWidth
                  name="insuranceInfo.socialInsStatus"
                  value={values.insuranceInfo?.socialInsStatus}
                  error={
                    !!touched.insuranceInfo?.socialInsStatus &&
                    !!errors.insuranceInfo?.socialInsStatus
                  }
                  helperText={
                    touched.insuranceInfo?.socialInsStatus &&
                    errors.insuranceInfo?.socialInsStatus
                      ? errors.insuranceInfo?.socialInsStatus
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {paymentStatus.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: "flex", alignItems: "end" }}>
                  <Typography
                    mr={2}
                    sx={{
                      color: COLOR.primary_black_placeholder,
                      fontWeight: 700,
                    }}
                  >
                    Ảnh chụp BHTN hoặc tra cứu BHTN:{" "}
                  </Typography>
                  <HorizontalImageInput
                    disabled={!isEditable}
                    id="social-ins-image"
                    name="insuranceInfo.socialInsImage"
                    onClick={() =>
                      document.getElementById("social-ins-image").click()
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            {/* BHTN */}
            <Typography
              sx={{
                mt: 3,
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              2. Bảo hiểm Tai nạn:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  // id=""
                  label="Mã số BHTN"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="insuranceInfo.accidentInsID"
                  value={values.insuranceInfo?.accidentInsID}
                  error={
                    !!touched.insuranceInfo?.accidentInsID &&
                    !!errors.insuranceInfo?.accidentInsID
                  }
                  helperText={
                    touched.insuranceInfo?.accidentInsID &&
                    errors.insuranceInfo?.accidentInsID
                      ? errors.insuranceInfo?.accidentInsID
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ngày tham gia"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.accidentInsStartDate"
                  value={values.insuranceInfo?.accidentInsStartDate}
                  error={
                    !!touched.insuranceInfo?.accidentInsStartDate &&
                    !!errors.insuranceInfo?.accidentInsStartDate
                  }
                  helperText={
                    touched.insuranceInfo?.accidentInsStartDate &&
                    errors.insuranceInfo?.accidentInsStartDate
                      ? errors.insuranceInfo?.accidentInsStartDate
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.accidentInsEndDate"
                  value={values.insuranceInfo?.accidentInsEndDate}
                  error={
                    !!touched.insuranceInfo?.accidentInsEndDate &&
                    !!errors.insuranceInfo?.accidentInsEndDate
                  }
                  helperText={
                    touched.insuranceInfo?.accidentInsEndDate &&
                    errors.insuranceInfo?.accidentInsEndDate
                      ? errors.insuranceInfo?.accidentInsEndDate
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
              <Grid size={2}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Trạng thái"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  select
                  fullWidth
                  name="insuranceInfo.accidentInsStatus"
                  value={values.insuranceInfo?.accidentInsStatus}
                  error={
                    !!touched.insuranceInfo?.accidentInsStatus &&
                    !!errors.insuranceInfo?.accidentInsStatus
                  }
                  helperText={
                    touched.insuranceInfo?.accidentInsStatus &&
                    errors.insuranceInfo?.accidentInsStatus
                      ? errors.insuranceInfo?.accidentInsStatus
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {paymentStatus.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={12}>
                <Box sx={{ display: "flex", alignItems: "end" }}>
                  <Typography
                    mr={2}
                    sx={{
                      color: COLOR.primary_black_placeholder,
                      fontWeight: 700,
                    }}
                  >
                    Ảnh chụp BHXH hoặc tra cứu BHXH:{" "}
                  </Typography>
                  <HorizontalImageInput
                    disabled={!isEditable}
                    id="accident-ins-image"
                    name="insuranceInfo.accidentInsImage"
                    onClick={() =>
                      document.getElementById("accident-ins-image").click()
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            {/* BHYT */}
            <Typography
              sx={{
                mt: 3,
                ml: 2,
                fontSize: 18,
                textDecoration: "underline",
                fontStyle: "italic",
                color: COLOR.primary_black_placeholder,
              }}
            >
              3. Bảo hiểm Y tế:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  // id=""
                  label="Mã số BHYT"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="insuranceInfo.healthInsID"
                  value={values.insuranceInfo?.healthInsID}
                  error={
                    !!touched.insuranceInfo?.healthInsID &&
                    !!errors.insuranceInfo?.healthInsID
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsID &&
                    errors.insuranceInfo?.healthInsID
                      ? errors.insuranceInfo?.healthInsID
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ngày tham gia"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.healthInsStartDate"
                  value={values.insuranceInfo?.healthInsStartDate}
                  error={
                    !!touched.insuranceInfo?.healthInsStartDate &&
                    !!errors.insuranceInfo?.healthInsStartDate
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsStartDate &&
                    errors.insuranceInfo?.healthInsStartDate
                      ? errors.insuranceInfo?.healthInsStartDate
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  type="date"
                  fullWidth
                  name="insuranceInfo.healthInsEndDate"
                  value={values.insuranceInfo?.healthInsEndDate}
                  error={
                    !!touched.insuranceInfo?.healthInsEndDate &&
                    !!errors.insuranceInfo?.healthInsEndDate
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsEndDate &&
                    errors.insuranceInfo?.healthInsEndDate
                      ? errors.insuranceInfo?.healthInsEndDate
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
              <Grid size={2}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Trạng thái"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  select
                  fullWidth
                  name="insuranceInfo.healthInsStatus"
                  value={values.insuranceInfo?.healthInsStatus}
                  error={
                    !!touched.insuranceInfo?.healthInsStatus &&
                    !!errors.insuranceInfo?.healthInsStatus
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsStatus &&
                    errors.insuranceInfo?.healthInsStatus
                      ? errors.insuranceInfo?.healthInsStatus
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {paymentStatus.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={6}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Nơi đăng ký khám chữa bệnh ban đầu"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="insuranceInfo.healthInsHospital"
                  value={values.insuranceInfo?.healthInsHospital}
                  error={
                    !!touched.insuranceInfo?.healthInsHospital &&
                    !!errors.insuranceInfo?.healthInsHospital
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsHospital &&
                    errors.insuranceInfo?.healthInsHospital
                      ? errors.insuranceInfo?.healthInsHospital
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={6} />
              <Box sx={{ display: "flex", alignItems: "end" }}>
                <Typography
                  mr={2}
                  sx={{
                    color: COLOR.primary_black_placeholder,
                    fontWeight: 700,
                  }}
                >
                  Ảnh chụp BHYT hoặc tra cứu BHYT:{" "}
                </Typography>
                <HorizontalImageInput
                  disabled={!isEditable}
                  id="health-ins-image"
                  name="insuranceInfo.healthInsImage"
                  onClick={() =>
                    document.getElementById("health-ins-image").click()
                  }
                />
              </Box>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CrewMemberDetail;

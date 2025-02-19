import React, { useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  StatusLabel,
  HorizontalImageInput,
  MultilineFileUploadField,
} from "../components/global";
import { CardPhotoInput, FileUploadField } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router";

const UserCandidateDetail = () => {
  const navigate = useNavigate();

  const { id, } = useParams();
  const status = "Chấp thuận"; //Change this to the status of the candidate
  //"Chấp thuận", "Từ chối", "Đang chờ xác nhận", "Đã ký hợp đồng"

  // useEffect(() => {
  //   fetchCandidateProfile(id);
  // },[]);

  const initialValues = {
    cardPhoto: "",
    fullName: "",
    dob: "",
    birthplace: "",
    nationality: "",
    phoneNumber: "",
    email: "",
    permanentAddr: "",
    temporaryAddr: "",
    ciNumber: "",
    ciIssueDate: "",
    ciIssuePlace: "",
    ciImageFront: "",
    ciImageBack: "",
    attachedFiles: [],
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        // validationSchema={crewContractSchema}
        // onSubmit={handleApproveDeclineClick}
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
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <PageTitle
                    title="THÔNG TIN HỒ SƠ ĐÃ NỘP"
                    subtitle={`Ứng viên: ${id}`} //Change this to the actual candidateID
                  />
                  {status === "Chấp thuận" ? (
                    <StatusLabel
                      label="Chấp thuận"
                      color={COLOR.primary_green}
                    />
                  ) : status === "Từ chối" ? (
                    <StatusLabel label="Từ chối" color={COLOR.primary_orange} />
                  ) : status === "Đang chờ xác nhận" ? (
                    <StatusLabel
                      label="Đang chờ xác nhận"
                      color={COLOR.primary_black_placeholder}
                    />
                  ) : (
                    <StatusLabel
                      label="Đã ký hợp đồng"
                      color={COLOR.secondary_gold}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    marginTop: 2,
                  }}
                >
                  {/* <Button
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
                    {createContractLoading ? (
                      <CircularProgress size={24} color={COLOR.primary_black} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        <PersonAddIcon
                          sx={{ marginRight: "5px", marginBottom: "1px" }}
                        />
                        <Typography sx={{ fontWeight: 700 }}>Thêm</Typography>
                      </Box>
                    )}
                  </Button> */}
                  <CardPhotoInput
                    id="card-photo"
                    name="cardPhoto"
                    sx={{ marginLeft: 2 }}
                    onClick={() =>
                      document.getElementById("card-photo").click()
                    }
                  />
                </Box>
              </Box>
            </Box>
            <SectionDivider sectionName="Thông tin ứng viên: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={5}>
                <InfoTextField
                  id="full-name"
                  label="Họ và tên"
                  size="small"
                  margin="none"
                  disabled={true}
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
              <Grid size={3}>
                <InfoTextField
                  id="dob"
                  type="date"
                  label="Ngày sinh"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="dob"
                  value={values.dob}
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob ? errors.dob : " "}
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
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="birthplace"
                  label="Nơi sinh"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="birthplace"
                  value={values.birthplace}
                  error={!!touched.birthplace && !!errors.birthplace}
                  helperText={
                    touched.birthplace && errors.birthplace
                      ? errors.birthplace
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
              <Grid size={5}>
                <InfoTextField
                  id="email"
                  label="Email"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="email"
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={
                    touched.email && errors.email ? errors.email : " "
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
                  id="phoneNumber"
                  label="Số điện thoại"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="phoneNumber"
                  value={values.phoneNumber}
                  error={!!touched.phoneNumber && !!errors.phoneNumber}
                  helperText={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
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
              <Grid size={3}>
                <InfoTextField
                  id="nationality"
                  label="Quốc tịch"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="nationality"
                  value={values.nationality}
                  error={!!touched.nationality && !!errors.nationality}
                  helperText={
                    touched.nationality && errors.nationality
                      ? errors.nationality
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
                  id="permanent-address"
                  label="Địa chỉ thường trú"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="permanentAddr"
                  value={values.permanentAddr}
                  error={!!touched.permanentAddr && !!errors.permanentAddr}
                  helperText={
                    touched.permanentAddr && errors.permanentAddr
                      ? errors.permanentAddr
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
                  id="temporary-address"
                  label="Địa chỉ tạm trú"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="temporaryAddr"
                  value={values.temporaryAddr}
                  error={!!touched.temporaryAddr && !!errors.temporaryAddr}
                  helperText={
                    touched.temporaryAddr && errors.temporaryAddr
                      ? errors.temporaryAddr
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
                  id="ci-number"
                  label="Số Căn cước công dân"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="ciNumber"
                  value={values.ciNumber}
                  error={!!touched.ciNumber && !!errors.ciNumber}
                  helperText={
                    touched.ciNumber && errors.ciNumber ? errors.ciNumber : " "
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
              <Grid size={3}>
                <InfoTextField
                  id="ci-issue-date"
                  type="date"
                  label="Ngày cấp"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="ciIssueDate"
                  value={values.ciIssueDate}
                  error={!!touched.ciIssueDate && !!errors.ciIssueDate}
                  helperText={
                    touched.ciIssueDate && errors.ciIssueDate
                      ? errors.ciIssueDate
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
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={5}>
                <InfoTextField
                  id="ci-issue-place"
                  label="Nơi cấp"
                  size="small"
                  margin="none"
                  disabled={true}
                  required
                  fullWidth
                  name="ciIssuePlace"
                  value={values.ciIssuePlace}
                  error={!!touched.ciIssuePlace && !!errors.ciIssuePlace}
                  helperText={
                    touched.ciIssuePlace && errors.ciIssuePlace
                      ? errors.ciIssuePlace
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <HorizontalImageInput
                    disabled={true}
                    width={250}
                    height={150}
                    id="ci-image-front"
                    name="ciImageFront"
                    onClick={() =>
                      document.getElementById("ci-image-front").click()
                    }
                  />
                  <Typography
                    mt={1}
                    sx={{
                      color: COLOR.primary_black_placeholder,
                      fontWeight: 700,
                    }}
                  >
                    Ảnh chụp mặt trước CCCD
                  </Typography>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <HorizontalImageInput
                    disabled={true}
                    width={250}
                    height={150}
                    id="ci-image-back"
                    name="ciImageBack"
                    onClick={() =>
                      document.getElementById("ci-image-back").click()
                    }
                  />
                  <Typography
                    mt={1}
                    sx={{
                      color: COLOR.primary_black_placeholder,
                      fontWeight: 700,
                    }}
                  >
                    Ảnh chụp mặt sau CCCD
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <SectionDivider sectionName="Tài liệu đính kèm: " />
            <MultilineFileUploadField name="attachedFiles" disabled={true} />
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default UserCandidateDetail;

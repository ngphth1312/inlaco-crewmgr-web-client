import React, { useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
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
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

const ApplyRecruitment = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const status = "Đang chờ xác nhận"; //Change this to the status of the candidate
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

  const phoneRegex =
    "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
  const ciNumberRegex = "^\\d{12}$";

  const applicationSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),

    dob: yup
      .date()
      .max(new Date(), "Ngày sinh không hợp lệ")
      .required("Ngày sinh không được để trống"),

    birthplace: yup.string().required("Nơi sinh không được để trống"),
    nationality: yup.string().required("Quốc tịch không được để trống"),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),

    permanentAddr: yup
      .string()
      .required("Địa chỉ thường trú không được để trống"),
    temporaryAddr: yup.string().required("Địa chỉ tạm trú không được để trống"),

    ciNumber: yup
      .string()
      .matches(ciNumberRegex, "Số CCCD không hợp lệ")
      .required("Số căn cước công dân không được để trống"),
    ciIssueDate: yup
      .date()
      .max(new Date(), "Ngày cấp không hợp lệ")
      .required("Ngày cấp không được để trống"),
    ciIssuePlace: yup.string().required("Nơi cấp không được để trống"),
  });

  const [loading, isLoading] = useState(false);

  const handleApplySubmit = async (values, { resetForm }) => {
    isLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch (err) {
      console.log("Error when submitting application for a recruitment: ", err);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={applicationSchema}
        onSubmit={handleApplySubmit}
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
                    title="NỘP HỒ SƠ ỨNG TUYỂN"
                    subtitle={`Bài đăng tuyển dụng: ${id}`} //Change this to the actual recruitmentID
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty}
                    sx={{
                      width: "12%",
                      padding: 1,
                      color: COLOR.primary_black,
                      backgroundColor: COLOR.primary_gold,
                      minWidth: 130,
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color={COLOR.primary_black} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        <SendRoundedIcon
                          sx={{ marginRight: "5px", marginBottom: "1px" }}
                        />
                        <Typography sx={{ fontWeight: 700 }}>
                          Nộp đơn
                        </Typography>
                      </Box>
                    )}
                  </Button>
                  <CardPhotoInput
                    id="card-photo"
                    name="cardPhoto"
                    sx={{ marginLeft: 2, marginRight: 2, }}
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
            <SectionDivider sectionName="Tài liệu đính kèm (nếu có): " />
            <MultilineFileUploadField name="attachedFiles" />
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default ApplyRecruitment;

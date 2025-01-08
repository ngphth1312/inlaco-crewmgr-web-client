import React, { useState } from "react";
import { PageTitle, SectionDivider, InfoTextField } from "../components/global";
import { CardPhotoInput } from "../components/contract";
import { Box, Button, Typography, TextField, MenuItem, CircularProgress } from "@mui/material";
import { COLOR } from "../assets/Color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router";

const AddCrewMember = () => {
  // const navigate = useNavigate();

  const genders = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];

  const initialValues = {
    fullName: "",
    dob: "",
    ciNumber: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
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
  });

  const [image, setImage] = useState(null);
  const [addCrewLoading, setAddCrewLoading] = useState(false);

  const handleCreateCrewMemberSubmit = async (values, { resetForm }) => {
    setAddCrewLoading(true);
    try{
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch(err){
      console.log("Error when adding new crew member: ", err);
    } finally{
      setAddCrewLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={crewMemberInfosSchema}
        onSubmit={handleCreateCrewMemberSubmit}
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
                  title="THÊM THUYỀN VIÊN"
                  subtitle="Thêm thuyền viên mới vào hệ thống"
                />
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
              </Box>
              <CardPhotoInput
                sx={{ marginRight: 5 }}
                image={image}
                onClick={() => document.getElementById("upload-photo").click()}
                onImageChange={handleImageChange}
              />
            </Box>
            <SectionDivider sectionName="Thông tin cá nhân: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
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
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  type="date"
                  id="dob"
                  label="Ngày sinh"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="dob"
                  value={values.dob}
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
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
                  id="ci-number"
                  label="Số Căn cước công dân"
                  size="small"
                  margin="none"
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
            <Box sx={{ padding: 4 }}>
              <Typography
                sx={{ textAlign: "center", color: COLOR.primary_black }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Thông tin công việc
                </span>{" "}
                và{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Thông tin Bảo hiểm
                </span>{" "}
                sẽ được thêm khi{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Tạo hợp đồng
                </span>
              </Typography>
            </Box>
            <SectionDivider sectionName="Thông tin Bảo hiểm: " />
            <Box sx={{ padding: 4 }}>
              <Typography
                sx={{ textAlign: "center", color: COLOR.primary_black }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Thông tin công việc
                </span>{" "}
                và{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Thông tin Bảo hiểm
                </span>{" "}
                sẽ được thêm khi{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: COLOR.primary_gray,
                    textDecoration: "underline",
                  }}
                >
                  Tạo hợp đồng
                </span>
              </Typography>
            </Box>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default AddCrewMember;

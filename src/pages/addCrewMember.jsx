import React, { useState } from "react";
import { PageTitle, SectionDivider } from "../components/global";
import { CardPhotoInput } from "../components/contract";
import { Box, Button, Typography, TextField, } from "@mui/material";
import { COLOR } from "../assets/Color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router";

const AddCrewMember = () => {
  // const navigate = useNavigate();

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

  const crewMemberInfosSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),
    dob: yup.string().required("Ngày sinh không được để trống"),
    ciNumber: yup
      .string()
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

  const handleCreateCrewMemberSubmit = async (values) => {
    console.log("Successfully submitted: ", values);
  };

  const handleCreateCrewMemberClick = () => {};

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
        onSubmit={handleCreateCrewMemberSubmit}
        initialValues={initialValues}
        validationSchema={crewMemberInfosSchema}
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
                    width: "50%",
                    padding: 1,
                    color: COLOR.primary_black,
                    backgroundColor: (!isValid || !dirty) ? COLOR.primary_light_gold : COLOR.primary_gold,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "end" }}>
                    <PersonAddIcon
                      sx={{ marginRight: "5px", marginBottom: "1px" }}
                    />
                    <Typography sx={{ fontWeight: 700 }}>Thêm</Typography>
                  </Box>
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
                <TextField
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
                <TextField
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
                />
              </Grid>
              <Grid size={3}>
                <TextField
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
                <TextField
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
                />
              </Grid>
              <Grid size={7}>
                <TextField
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
                <TextField
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
                <TextField
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
            <Box sx={{}}></Box>
            <SectionDivider sectionName="Thông tin BHXH: " />
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default AddCrewMember;

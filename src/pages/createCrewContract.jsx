import React, { useState } from "react";
import { PageTitle, SectionDivider, InfoTextField } from "../components/global";
import { CardPhotoInput } from "../components/contract";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { COLOR } from "../assets/Color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router";

const CreateCrewContract = () => {
  // const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    partyA: {
      compName: "",
      compAddress: "",
      compPhoneNumber: "",
      representative: "",
      representativePos: "",
    },
  };

  const phoneRegex =
    "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
  const ciNumberRegex = "^\\d{12}$";

  const crewContractSchema = yup.object().shape({
    fullName: yup.string().required("Họ và tên không được để trống"),
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
  });

  const [image, setImage] = useState(null);
  const [addCrewLoading, setAddCrewLoading] = useState(false);

  const handleCreateCrewContractSubmit = async (values, { resetForm }) => {
    setAddCrewLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch (err) {
      console.log("Error when adding new crew member: ", err);
    } finally {
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
                  title="TẠO HỢP ĐỒNG THUYỀN VIÊN"
                  subtitle="Tạo và lưu Hợp đồng thuyền viên mới vào hệ thống"
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
            <SectionDivider sectionName="Người sử dụng lao động (Bên A): " />
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
                  error={!!touched.partyA?.compPhoneNumber && !!errors.partyA?.compPhoneNumber}
                  helperText={touched.partyA?.compPhoneNumber && errors.partyA?.compPhoneNumber}
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
            <SectionDivider sectionName="Người lao động (Bên B): " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Thông tin công việc: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Thông tin lương: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Thông tin Bảo hiểm: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CreateCrewContract;

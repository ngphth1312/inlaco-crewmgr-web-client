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

const CreateCourse = () => {
  // const navigate = useNavigate();

  const initialValues = {};

  const phoneRegex =
    "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\\d{7}$";
  const ciNumberRegex = "^\\d{12}$";

  const crewContractSchema = yup.object().shape({});

  const [createCourseLoading, setCreateCourseLoading] = useState(false);

  const handleCreateCourseSubmit = async (values, { resetForm }) => {
    setCreateCourseLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 2000)); //Mock API call

      console.log("Successfully submitted: ", values);
      resetForm();
    } catch (err) {
      console.log("Error when creating course: ", err);
    } finally {
      setCreateCourseLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={crewContractSchema}
        onSubmit={handleCreateCourseSubmit}
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
                  title="TẠO KHÓA ĐÀO TẠO THUYỀN VIÊN"
                  subtitle="Tạo các khóa đào tạo thuyền viên mới"
                />
                <Box
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
                    {createCourseLoading ? (
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
              </Box>
            </Box>
            <SectionDivider sectionName="Người sử dụng lao động (Bên A)*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Người lao động (Bên B)*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Thông tin công việc*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
            <SectionDivider sectionName="Thông tin lương*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}></Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CreateCourse;

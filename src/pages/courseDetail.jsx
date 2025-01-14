import React, { useEffect, useState } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  HorizontalImageInput,
} from "../components/global";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import { LogoInput } from "../components/other";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  CircularProgress,
  InputAdornment,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { COLOR } from "../assets/Color";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";

const CourseDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  //   useEffect(() => {
  //     fetchCourseDetail(id);
  //   }, [])

  const initialValues = {
    instructorName: "",
    institute: "",
    instituteLogo: "",
    courseName: "",
    startDate: "",
    endDate: "",
    description: "",
    estimatedCourseDuration: "",
    isCertificatedCourse: "",
    courseWallpaper: "",
  };

  const isCertificatedCourseOption = ["Có", "Không"];

  const courseSchema = yup.object().shape({
    instructorName: yup.string(),
    institute: yup.string().required("Tên đơn vị đào tạo không được để trống"),
    instituteLogo: yup.string(),

    courseName: yup.string().required("Tên khóa học không được để trống"),
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
    description: yup.string().required("Mô tả khóa học không được để trống"),
    estimatedCourseDuration: yup
      .number()
      .required("Thời gian ước lượng không được để trống"),

    isCertificatedCourse: yup.string().required("Vui lòng chọn một lựa chọn"),
  });

  const [openClosedLoading, setOpenClosedLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
      setIsEditable(true);
    };

    const handleCancelClick = () => {
      setIsEditable(false);
    };

    const handleSwitchingOpenClosedClick = async () => {
      setOpenClosedLoading(true);
      try {
        //Call API to update the status of the recruitment
        await new Promise((resolve) => setTimeout(resolve, 1000)); //Mock API call

        setIsClosed(!isClosed);
      } catch (error) {
        console.log("Error when updating course status: ", error);
      } finally {
        setOpenClosedLoading(false);
      }
    };

  const handleSaveCourseSubmit = async (values) => {
    // setCreateCourseLoading(true);
    try {
      //Calling API to create a new crew member
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Mock API call

      console.log("Successfully submitted: ", values);
      setIsEditable(false);
    } catch (err) {
      console.log("Error when creating course: ", err);
    } finally {
    //   setCreateCourseLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        initialValues={initialValues}
        validationSchema={courseSchema}
        onSubmit={handleSaveCourseSubmit}
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
                  title="CHI TIẾT KHÓA ĐÀO TẠO THUYỀN VIÊN"
                  subtitle={`Tên khóa đào tạo: ${id}`} //this should be the course name
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || !dirty || createCourseLoading}
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
                        <SaveIcon
                          sx={{ marginRight: "5px", marginBottom: "1px" }}
                        />
                        <Typography sx={{ fontWeight: 700 }}>Tạo</Typography>
                      </Box>
                    )}
                  </Button> */}
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
                        disabled={!isClosed}
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
                  <Button
                    variant="contained"
                    onClick={() => handleSwitchingOpenClosedClick()}
                    disabled={openClosedLoading || isEditable}
                    sx={{
                      width: "15%",
                      padding: 1,
                      color: COLOR.primary_white,
                      backgroundColor: isClosed
                        ? COLOR.primary_blue
                        : COLOR.primary_orange,
                      minWidth: 110,
                    }}
                  >
                    {openClosedLoading ? (
                      <CircularProgress size={24} color={COLOR.primary_black} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "end" }}>
                        {isClosed ? (
                          <CheckCircleRoundedIcon
                            sx={{
                              marginRight: "5px",
                              marginBottom: "3px",
                              width: 20,
                              height: 20,
                            }}
                          />
                        ) : (
                          <EventBusyRoundedIcon
                            sx={{
                              marginRight: "5px",
                              marginBottom: "3px",
                              width: 20,
                              height: 20,
                            }}
                          />
                        )}
                        <Typography sx={{ fontWeight: 700, marginLeft: "2px" }}>
                          {isClosed ? "Mở đăng ký" : "Đóng đăng ký"}
                        </Typography>
                      </Box>
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
            <SectionDivider sectionName="Thông tin cơ sở đào tạo*: " />
            <Grid
              container
              spacing={2}
              mx={2}
              rowSpacing={1}
              pt={2}
              sx={{ justifyContent: "center" }}
            >
              <Grid size={1}>
                <LogoInput
                  id="institute-logo"
                  name="instituteLogo"
                  onClick={() =>
                    document.getElementById("institute-logo").click()
                  }
                />
              </Grid>
              <Grid size={5}>
                <InfoTextField
                  id="institute"
                  label="Đơn vị đào tạo"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="institute"
                  value={values.institute}
                  error={!!touched.institute && !!errors.institute}
                  helperText={
                    touched.institute && errors.institute
                      ? errors.institute
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
                    marginTop: 2,
                  }}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="instructor-name"
                  label="Tên giảng viên"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  fullWidth
                  name="instructorName"
                  value={values.instructorName}
                  error={!!touched.instructorName && !!errors.instructorName}
                  helperText={
                    touched.instructorName && errors.instructorName
                      ? errors.instructorName
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
                    marginTop: 2,
                  }}
                />
              </Grid>
            </Grid>
            <SectionDivider sectionName="Thông tin khóa đào tạo*: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  id="course-name"
                  label="Tên khóa học"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="courseName"
                  value={values.courseName}
                  error={!!touched.courseName && !!errors.courseName}
                  helperText={
                    touched.courseName && errors.courseName
                      ? errors.courseName
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
                  id="start-date"
                  type="date"
                  label="Ngày bắt đầu"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="startDate"
                  value={values.startDate}
                  error={!!touched.startDate && !!errors.startDate}
                  helperText={
                    touched.startDate && errors.startDate
                      ? errors.startDate
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
              <Grid size={4}>
                <InfoTextField
                  id="end-date"
                  type="date"
                  label="Ngày kết thúc"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="endDate"
                  value={values.endDate}
                  error={!!touched.endDate && !!errors.endDate}
                  helperText={
                    touched.endDate && errors.endDate ? errors.endDate : " "
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
              <Grid size={4}>
                <InfoTextField
                  id="basic-salary"
                  type="number"
                  label="Thời lượng khóa học dự kiến"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="estimatedCourseDuration"
                  value={values.estimatedCourseDuration}
                  error={
                    !!touched.estimatedCourseDuration &&
                    !!errors.estimatedCourseDuration
                  }
                  helperText={
                    touched.estimatedCourseDuration &&
                    errors.estimatedCourseDuration
                      ? errors.estimatedCourseDuration
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">tuần</InputAdornment>
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
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: COLOR.primary_black,
                    },
                    "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                      borderColor: COLOR.primary_black,
                    },
                  }}
                />
                <InfoTextField
                  id="estimated-course-time"
                  select
                  label="Khóa học có cấp chứng chỉ?"
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="isCertificatedCourse"
                  value={values.isCertificatedCourse}
                  error={
                    !!touched.isCertificatedCourse &&
                    !!errors.isCertificatedCourse
                  }
                  helperText={
                    touched.isCertificatedCourse && errors.isCertificatedCourse
                      ? errors.isCertificatedCourse
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
                >
                  {isCertificatedCourseOption.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={8}>
                <InfoTextField
                  id="description"
                  label="Mô tả khóa học"
                  rows={8}
                  multiline
                  size="small"
                  margin="none"
                  disabled={!isEditable}
                  required
                  fullWidth
                  name="description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={
                    touched.description && errors.description
                      ? errors.description
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
              <Grid size={12}>
                <HorizontalImageInput
                  id="course-wallpaper"
                  name="courseWallpaper"
                  width="100%"
                  height={250}
                  onClick={() =>
                    document.getElementById("course-wallpaper").click()
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default CourseDetail;

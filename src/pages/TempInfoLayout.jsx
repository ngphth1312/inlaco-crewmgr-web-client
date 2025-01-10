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

  const receiveMethod = ["Tiền mặt", "Chuyển khoản ngân hàng"];
  const paymentStatus = ["Chưa thanh toán", "Đã thanh toán"];

  const initialValues = {
    partyA: {
      compName: "Công ty INLACO Hải Phòng",
      compAddress: "",
      compPhoneNumber: "",
      representative: "",
      representativePos: "Trưởng phòng Nhân sự",
    },
    partyB: {
      fullName: "",
      dob: "",
      birthplace: "",
      nationality: "",
      permanentAddr: "",
      temporaryAddr: "",
      ciNumber: "",
      ciIssueDate: "",
      ciIssuePlace: "",
    },
    jobInfo: {
      startDate: "",
      endDate: "",
      workingLocation: "Địa điểm làm việc sẽ được thông báo sau",
      position: "",
      jobDescription: "",
    },
    salaryInfo: {
      basicSalary: 0,
      allowance: 0,
      receiveMethod: "Tiền mặt",
      payday: "Ngày 5 hàng tháng",
      salaryReviewPeriod: "Mỗi 3 tháng",
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
      fullName: yup.string().required("Họ và tên không được để trống"),

      dob: yup
        .date()
        .max(new Date(), "Ngày sinh không hợp lệ")
        .required("Ngày sinh không được để trống"),

      birthplace: yup.string().required("Nơi sinh không được để trống"),
      nationality: yup.string().required("Quốc tịch không được để trống"),
      permanentAddr: yup
        .string()
        .required("Địa chỉ thường trú không được để trống"),
      temporaryAddr: yup
        .string()
        .required("Địa chỉ tạm trú không được để trống"),

      ciNumber: yup
        .string()
        .matches(ciNumberRegex, "Số CCCD không hợp lệ")
        .required("Số căn cước công dân không được để trống"),
      ciIssueDate: yup
        .date()
        .max(new Date(), "Ngày cấp không hợp lệ")
        .required("Ngày cấp không được để trống"),
      ciIssuePlace: yup.string().required("Nơi cấp không được để trống"),
    }),

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

    salaryInfo: yup.object().shape({
      basicSalary: yup
        .number()
        .min(0, "Lương cơ bản không hợp lệ")
        .required("Lương cơ bản không được để trống"),
      allowance: yup.number().min(0, "Phụ cấp không hợp lệ"),
      receiveMethod: yup
        .string()
        .required("Hình thức trả lương không được để trống"),

      payday: yup
        .date()
        .max(new Date(), "Thời hạn trả lương không hợp lệ")
        .required("Thời hạn trả lương không được để trống"),

      salaryReviewPeriod: yup
        .string()
        .required("Thời hạn được xét nâng lương không được để trống"),
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
            <SectionDivider sectionName="Người lao động (Bên B): " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={3}>
                <InfoTextField
                  id="full-name"
                  label="Họ và tên"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.fullName"
                  value={values.partyB?.fullName}
                  error={
                    !!touched.partyB?.fullName && !!errors.partyB?.fullName
                  }
                  helperText={
                    touched.partyB?.fullName && errors.partyB?.fullName
                      ? errors.partyB?.fullName
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.dob"
                  value={values.partyB?.dob}
                  error={!!touched.partyB?.dob && !!errors.partyB?.dob}
                  helperText={
                    touched.partyB?.dob && errors.partyB?.dob
                      ? errors.partyB?.dob
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
                  id="birthplace"
                  label="Nơi sinh"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.birthplace"
                  value={values.partyB?.birthplace}
                  error={
                    !!touched.partyB?.birthplace && !!errors.partyB?.birthplace
                  }
                  helperText={
                    touched.partyB?.birthplace && errors.partyB?.birthplace
                      ? errors.partyB?.birthplace
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.nationality"
                  value={values.partyB?.nationality}
                  error={
                    !!touched.partyB?.nationality &&
                    !!errors.partyB?.nationality
                  }
                  helperText={
                    touched.partyB?.nationality && errors.partyB?.nationality
                      ? errors.partyB?.nationality
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.permanentAddr"
                  value={values.partyB?.permanentAddr}
                  error={
                    !!touched.partyB?.permanentAddr &&
                    !!errors.partyB?.permanentAddr
                  }
                  helperText={
                    touched.partyB?.permanentAddr &&
                    errors.partyB?.permanentAddr
                      ? errors.partyB?.permanentAddr
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.temporaryAddr"
                  value={values.partyB?.temporaryAddr}
                  error={
                    !!touched.partyB?.temporaryAddr &&
                    !!errors.partyB?.temporaryAddr
                  }
                  helperText={
                    touched.partyB?.temporaryAddr &&
                    errors.partyB?.temporaryAddr
                      ? errors.partyB?.temporaryAddr
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.ciNumber"
                  value={values.partyB?.ciNumber}
                  error={
                    !!touched.partyB?.ciNumber && !!errors.partyB?.ciNumber
                  }
                  helperText={
                    touched.partyB?.ciNumber && errors.partyB?.ciNumber
                      ? errors.partyB?.ciNumber
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="partyB.ciIssueDate"
                  value={values.partyB?.ciIssueDate}
                  error={
                    !!touched.partyB?.ciIssueDate &&
                    !!errors.partyB?.ciIssueDate
                  }
                  helperText={
                    touched.partyB?.ciIssueDate && errors.partyB?.ciIssueDate
                      ? errors.partyB?.ciIssueDate
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
              <Grid size={5}>
                <InfoTextField
                  id="ci-issue-place"
                  label="Nơi cấp"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="partyB.ciIssuePlace"
                  value={values.partyB?.ciIssuePlace}
                  error={
                    !!touched.partyB?.ciIssuePlace &&
                    !!errors.partyB?.ciIssuePlace
                  }
                  helperText={
                    touched.partyB?.ciIssuePlace && errors.partyB?.ciIssuePlace
                      ? errors.partyB?.ciIssuePlace
                      : " "
                  }
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
            <SectionDivider sectionName="Thông tin lương: " />
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={3}>
                <InfoTextField
                  id="basic-salary"
                  label="Lương cơ bản"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="salaryInfo.basicSalary"
                  value={values.salaryInfo?.basicSalary}
                  error={
                    !!touched.salaryInfo?.basicSalary &&
                    !!errors.salaryInfo?.basicSalary
                  }
                  helperText={
                    touched.salaryInfo?.basicSalary &&
                    errors.salaryInfo?.basicSalary
                      ? errors.salaryInfo?.basicSalary
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="allowance"
                  label="Phụ cấp"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="salaryInfo.allowance"
                  value={values.salaryInfo?.allowance}
                  error={
                    !!touched.salaryInfo?.allowance &&
                    !!errors.salaryInfo?.allowance
                  }
                  helperText={
                    touched.salaryInfo?.allowance &&
                    errors.salaryInfo?.allowance
                      ? errors.salaryInfo?.allowance
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="receive-method"
                  select
                  label="Hình thức trả lương"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="salaryInfo.receiveMethod"
                  value={values.salaryInfo?.receiveMethod}
                  error={
                    !!touched.salaryInfo?.receiveMethod &&
                    !!errors.salaryInfo?.receiveMethod
                  }
                  helperText={
                    touched.salaryInfo?.receiveMethod &&
                    errors.salaryInfo?.receiveMethod
                      ? errors.salaryInfo?.receiveMethod
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {receiveMethod.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </InfoTextField>
              </Grid>
              <Grid size={3}>
                <InfoTextField
                  id="payday"
                  label="Thời hạn trả lương"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="salaryInfo.payday"
                  value={values.salaryInfo?.payday}
                  error={
                    !!touched.salaryInfo?.payday && !!errors.salaryInfo?.payday
                  }
                  helperText={
                    touched.salaryInfo?.payday && errors.salaryInfo?.payday
                      ? errors.salaryInfo?.payday
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={4}>
                <InfoTextField
                  id="salary-review-period"
                  label="Thời hạn được xét nâng lương"
                  size="small"
                  margin="none"
                  required
                  fullWidth
                  name="salaryInfo.salaryReviewPeriod"
                  value={values.salaryInfo?.salaryReviewPeriod}
                  error={
                    !!touched.salaryInfo?.salaryReviewPeriod &&
                    !!errors.salaryInfo?.salaryReviewPeriod
                  }
                  helperText={
                    touched.salaryInfo?.salaryReviewPeriod &&
                    errors.salaryInfo?.salaryReviewPeriod
                      ? errors.salaryInfo?.salaryReviewPeriod
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
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
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
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
              <Grid size={6}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ảnh chụp tra cứu BHXH"
                  size="small"
                  margin="none"
                  fullWidth
                  name="insuranceInfo.socialInsImage"
                  value={values.insuranceInfo?.socialInsImage}
                  error={
                    !!touched.insuranceInfo?.socialInsImage &&
                    !!errors.insuranceInfo?.socialInsImage
                  }
                  helperText={
                    touched.insuranceInfo?.socialInsImage &&
                    errors.insuranceInfo?.socialInsImage
                      ? errors.insuranceInfo?.socialInsImage
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            {/* BHTN */}
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
              2. Bảo hiểm Tai nạn:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  // id=""
                  label="Mã số BHTN"
                  size="small"
                  margin="none"
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
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
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
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
              <Grid size={6}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ảnh chụp tra cứu BHTN"
                  size="small"
                  margin="none"
                  fullWidth
                  name="insuranceInfo.accidentInsImage"
                  value={values.insuranceInfo?.accidentInsImage}
                  error={
                    !!touched.insuranceInfo?.accidentInsImage &&
                    !!errors.insuranceInfo?.accidentInsImage
                  }
                  helperText={
                    touched.insuranceInfo?.accidentInsImage &&
                    errors.insuranceInfo?.accidentInsImage
                      ? errors.insuranceInfo?.accidentInsImage
                      : " "
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
            {/* BHYT */}
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
              3. Bảo hiểm Y tế:
            </Typography>
            <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
              <Grid size={4}>
                <InfoTextField
                  // id=""
                  label="Mã số BHYT"
                  size="small"
                  margin="none"
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
                  // id="salary-review-period"
                  label="Ngày hết hạn"
                  size="small"
                  margin="none"
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
                    input: {
                      placeholder: "asjdbnaskjd",
                    },
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
              <Grid size={6}>
                <InfoTextField
                  // id="salary-review-period"
                  label="Ảnh chụp tra cứu BHYT"
                  size="small"
                  margin="none"
                  fullWidth
                  name="insuranceInfo.healthInsImage"
                  value={values.insuranceInfo?.healthInsImage}
                  error={
                    !!touched.insuranceInfo?.healthInsImage &&
                    !!errors.insuranceInfo?.healthInsImage
                  }
                  helperText={
                    touched.insuranceInfo?.healthInsImage &&
                    errors.insuranceInfo?.healthInsImage
                      ? errors.insuranceInfo?.healthInsImage
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

export default CreateCrewContract;
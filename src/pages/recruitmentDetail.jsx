import React, { useState, useEffect } from "react";
import { PageTitle, SectionDivider, InfoTextField } from "../components/global";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { COLOR } from "../assets/Color";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router";

const RecruitmentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const [hideUnhideLoading, setHideUnhideLoading] = useState(false);
  // const [isActive, setIsActive] = useState(true);
  const [openClosedLoading, setOpenClosedLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  //   useEffect(() => {
  //     fetchRecruitmentInfo();
  //   }, [])

  const values = { // this will be replaced by the actual data when fetching API
    recruitmentStartDate: "2025-01-13",
    recruitmentEndDate: "2025-07-08",
    title: "Tuyển dụng kỹ sư phần mềm",
    position: "Kỹ sư phần mềm",
    workLocation: "Hà Nội",
    expectedSalary: 15000000,
    content: "Mô tả công việc chi tiết sẽ được cung cấp ở đây.",
  };

  // const handleSwitchingIsActiveClick = async () => {
  //   setIsActive(!isActive);
  // };

  const handleSwitchingOpenClosedClick = async () => {
    console.log("Switching open closed click");
    setOpenClosedLoading(true);
    try{
      //Call API to update the status of the recruitment
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Mock API call

      setIsClosed(!isClosed);
    } catch (error) {
      console.log("Error when updating recruitment status: ", error);
    } finally {
      setOpenClosedLoading(false);
    }
  };

  return (
    <div>
      <Box m="20px">
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
              title="CHI TIẾT BÀI ĐĂNG TUYỂN DỤNG"
              subtitle="Chi tiết bài đăng tuyển dụng Thuyền viên mới"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {/* <Button
                variant="contained"
                onClick={() => handleSwitchingIsActiveClick()}
                disabled={!isClosed}
                sx={{
                  width: "8%",
                  padding: 1,
                  color: COLOR.primary_black,
                  backgroundColor: COLOR.primary_gold,
                  minWidth: 110,
                  marginRight: 2,
                }}
              >
                {hideUnhideLoading ? (
                  <CircularProgress size={24} color={COLOR.primary_black} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "end" }}>
                    {isActive ? (
                      <VisibilityOffIcon
                        sx={{
                          marginRight: "5px",
                          marginBottom: "3px",
                          width: 20,
                          height: 20,
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          marginRight: "5px",
                          marginBottom: "3px",
                          width: 20,
                          height: 20,
                        }}
                      />
                    )}
                    <Typography sx={{ fontWeight: 700 }}>
                      {isActive ? "Ẩn" : "Hiện"}
                    </Typography>
                  </Box>
                )}
              </Button> */}
              <Button
                variant="contained"
                onClick={() => handleSwitchingOpenClosedClick()}
                disabled={openClosedLoading}
                sx={{
                  width: "15%",
                  padding: 1,
                  color: COLOR.primary_white,
                  backgroundColor: isClosed ? COLOR.primary_blue : COLOR.primary_orange,
                  minWidth: 110,
                }}
              >
                {openClosedLoading ? (
                  <CircularProgress size={24} color={COLOR.primary_black} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "end" }}>
                    {isClosed ? (
                      <VisibilityOffIcon
                        sx={{
                          marginRight: "5px",
                          marginBottom: "3px",
                          width: 20,
                          height: 20,
                        }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{
                          marginRight: "5px",
                          marginBottom: "3px",
                          width: 20,
                          height: 20,
                        }}
                      />
                    )}
                    <Typography sx={{ fontWeight: 700, }}>
                      {isClosed ? "Mở đăng ký" : "Đóng đăng ký"}
                    </Typography>
                  </Box>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          px={2}
          mt={4}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <InfoTextField
            id="recruitment-start-date"
            type="date"
            label="Ngày mở đăng ký"
            size="small"
            margin="none"
            disabled={true}
            required
            fullWidth
            name="recruitmentStartDate"
            value={values.recruitmentStartDate}
            mx={2}
            sx={{
              width: "40%",
              marginBottom: 0,
              "& .MuiInputBase-input.Mui-disabled": {
                color: COLOR.primary_black,
                WebkitTextFillColor: COLOR.primary_black, // Ensure text color is black
              },
              "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                borderColor: COLOR.primary_black, // Ensure border color is black
              },
              // "& .MuiInputLabel-root.Mui-disabled": {
              //   color: COLOR.primary_black, // Ensure label color is black
              // },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
            }}
          >
            <Box
              sx={{
                borderBottom: `2px solid ${COLOR.primary_black}`,
                width: "40%",
              }}
            />
          </Box>
          <InfoTextField
            id="recruitment-end-date"
            label="Ngày đóng đăng ký"
            size="small"
            margin="none"
            disabled={true}
            type="date"
            required
            fullWidth
            name="recruitmentEndDate"
            value={values.recruitmentEndDate}
            mx={2}
            sx={{
              width: "40%",
              marginBottom: 0,
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
        </Box>
        <SectionDivider
          sx={{ marginTop: 2 }}
          sectionName="Thông tin bài đăng*: "
        />
        <Grid container spacing={2} mx={2} rowSpacing={1} pt={2}>
          <Grid size={4}>
            <InfoTextField
              id="title"
              label="Tiêu đề bài đăng"
              size="small"
              margin="none"
              disabled={true}
              required
              fullWidth
              name="title"
              value={values.title}
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
              id="position"
              label="Vị trí tuyển dụng"
              size="small"
              margin="none"
              disabled={true}
              required
              fullWidth
              name="position"
              value={values.position}
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
          <Grid size={2.5}>
            <InfoTextField
              id="work-location"
              label="Địa điểm"
              size="small"
              margin="none"
              disabled={true}
              required
              fullWidth
              name="workLocation"
              value={values.workLocation}
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
          <Grid size={2.5}>
            <InfoTextField
              id="salary"
              label="Mức lương"
              size="small"
              type="number"
              margin="none"
              disabled={true}
              required
              fullWidth
              name="salary"
              value={values.salary}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">vnđ</InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  color: COLOR.primary_black,
                },
                "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                  borderColor: COLOR.primary_black,
                },
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
          <Grid size={12}>
            <InfoTextField
              id="content"
              label="Mô tả công việc"
              rows={8}
              multiline
              size="small"
              margin="none"
              disabled={true}
              required
              fullWidth
              name="content"
              value={values.content}
              sx={{
                marginTop: 2,
                "& .MuiInputBase-input.Mui-disabled": {
                  color: COLOR.primary_black,
                },
                "& .MuiOutlinedInput-notchedOutline.Mui-disabled": {
                  borderColor: COLOR.primary_black,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RecruitmentDetail;

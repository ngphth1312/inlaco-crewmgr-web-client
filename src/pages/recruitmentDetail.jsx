import React, { useState, useEffect } from "react";
import {
  PageTitle,
  SectionDivider,
  InfoTextField,
  SwitchBar,
  NoValuesOverlay,
} from "../components/global";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockCandidates } from "../data/mockData";
import { COLOR } from "../assets/Color";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Grid from "@mui/material/Grid2";
import { formatDateTime } from "../utils/ValueConverter";
import { useNavigate, useParams, useLocation } from "react-router";

const RecruitmentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const isAdmin = location.state?.isAdmin;

  const isAlreadyApplied = true; //this later will be replaced by the actual applied status of the user when fetching API

  // useEffect(() => {
  //   fetchRecruitmentInfo();
  // }, []);

  // const [hideUnhideLoading, setHideUnhideLoading] = useState(false);
  // const [isActive, setIsActive] = useState(true);

  const columns = [
    {
      field: "id",
      headerName: "STT",
      flex: 0.75,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "timeOfApplication",
      headerName: "Thời gian ứng tuyển",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => formatDateTime(params),
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "detail",
      headerName: "Chi tiết",
      sortable: false,
      flex: 0.75,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => onAdminMemberDetailClick(id, params?.id)}
              sx={{
                backgroundColor: COLOR.primary_green,
                color: COLOR.primary_black,
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  width: 15,
                  height: 15,
                  marginTop: "4px",
                  marginBottom: "4px",
                }}
              />
            </Button>
          </div>
        );
      },
    },
  ];

  const [openClosedLoading, setOpenClosedLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleUserApplicationClick = (id) => {
    if(isAlreadyApplied) {
      navigate(`/recruitment/${id}/application`);
    } else{
      navigate(`/recruitment/${id}/apply`);
    }
  };

  const onAdminMemberDetailClick = (id, candidateID) => {
    navigate(`/recruitment/${id}/candidates/${candidateID}/admin`);
  };

  //   useEffect(() => {
  //     fetchRecruitmentInfo();
  //   }, [])

  const values = {
    // this will be replaced by the actual data when fetching API
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
    try {
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
              subtitle={`Chi tiết bài đăng tuyển dụng: ${id}`} //replace this ID with the actual recruitment ID when fetching API
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {isAdmin ? (
                <Button
                  variant="contained"
                  onClick={() => handleSwitchingOpenClosedClick()}
                  disabled={openClosedLoading}
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
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleUserApplicationClick(id)}
                  sx={{
                    backgroundColor: COLOR.primary_gold,
                    color: COLOR.primary_black,
                    borderRadius: 2,
                  }}
                >
                  <AppRegistrationRoundedIcon />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      marginLeft: "4px",
                    }}
                  >
                    {isAlreadyApplied ? "XEM HỒ SƠ ỨNG TUYỂN" : "ỨNG TUYỂN"}
                  </Typography>
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <>
          {isAdmin && (
            <SwitchBar
              tabLabel1={"Thông tin bài đăng"}
              tabLabel2={"Danh sách ứng viên"}
              variant={"fullWidth"}
              onChange={(newValue) => handleTabChange(newValue)}
              color={COLOR.secondary_blue}
              sx={{
                backgroundColor: COLOR.secondary_white,
                marginTop: 2,
              }}
            />
          )}
          {tabValue === 1 ? (
            <Box
              m="20px 0 0 0"
              height="62vh"
              maxHeight={550}
              maxWidth={1600}
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: COLOR.secondary_blue,
                  color: COLOR.primary_white,
                },
                "& .MuiTablePagination-root": {
                  backgroundColor: COLOR.secondary_blue,
                  color: COLOR.primary_white,
                },
              }}
            >
              <DataGrid
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnResize
                getRowHeight={() => "auto"}
                rows={mockCandidates}
                columns={columns}
                slots={{ noRowsOverlay: NoValuesOverlay }}
                pageSizeOptions={[5, 10, { value: -1, label: "All" }]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                sx={{
                  backgroundColor: "#FFF",
                  headerAlign: "center",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontSize: 16,
                    fontWeight: 700,
                  },
                }}
              />
            </Box>
          ) : (
            <>
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
            </>
          )}
        </>
      </Box>
    </div>
  );
};

export default RecruitmentDetail;

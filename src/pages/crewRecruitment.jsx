import React, { useState, useEffect } from "react";
import {
  Pagination,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageTitle, SwitchBar, NoValuesOverlay } from "../components/global";
import { DataGrid } from "@mui/x-data-grid";
import { mockCandidates } from "../data/mockData";
import { RecruitmentCard } from "../components/other";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate, useLocation } from "react-router";
import { useAppContext } from "../contexts/AppContext";
import HttpStatusCodes from "../assets/constants/httpStatusCodes";
import { getAllPostAPI, getAllCandidatesAPI } from "../services/postServices";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { formatDateTime } from "../utils/ValueConverter";

const CrewRecruitment = () => {
  const navigate = useNavigate();
  const { roles } = useAppContext();
  const isAdmin = roles.includes("ADMIN");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPostAPI(0, 10);
        await new Promise((resolve) => setTimeout(resolve, 200)); //Delay the UI for 400ms

        if (response.status === HttpStatusCodes.OK) {
          setPosts(response.data);
        } else {
          console.error("Error when fetching posts: ", response);
        }
      } catch (error) {
        console.error("Error when fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreateRecruitmentClick = () => {
    navigate("/recruitment/create");
  };

  const handleRecruitmentClick = (id) => {
    navigate(`/recruitment/${id}`, { state: { isAdmin: isAdmin } });
  };

  const onAdminMemberDetailClick = (candidateID) => {
    navigate(`/recruitment/candidates/${candidateID}/admin`);
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Họ tên",
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
      field: "gender",
      headerName: "Giới tính",
      sortable: false,
      flex: 0.75,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {params.value === "MALE" ? "Nam" : params.value === "FEMALE" ? "Nữ" : "Khác"}
          </Box>
        );
      },
    },
    {
      field: "birthDate",
      headerName: "Ngày sinh",
      sortable: false,
      flex: 1.5,
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
              padding: 10,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => onAdminMemberDetailClick(params?.id)}
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

  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [candidateList, setCandidateList] = useState([]);

  const handleTabChange = async (newValue) => {
    setSectionLoading(true);
    if(newValue == 1){
      try{
        const response = await getAllCandidatesAPI(0, 20, "APPLIED");
        await new Promise((resolve) => setTimeout(resolve, 200)); //Delay the UI for 200ms

        if (response.status === HttpStatusCodes.OK) {
          console.log("Candidates: ", response.data.content);
          setCandidateList(response.data.content);
          setTabValue(newValue);
        } else {
          console.error("Error when fetching candidates: ", response);
        }
      } catch (error) {
        console.error("Error when fetching candidates: ", error);
      } finally {
        setSectionLoading(false);
      }

    } else{
      setTabValue(newValue);
      setSectionLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200)); //Delay the UI for 200ms
      setSectionLoading(false);
    }
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="TUYỂN DỤNG"
            subtitle="Danh sách các bài đăng tuyển dụng Thuyền viên"
          />
        </Box>
        {isAdmin && (
          <SwitchBar
            tabLabel1={"Danh sách bài đăng"}
            tabLabel2={"Danh sách đơn ứng tuyển"}
            variant={"fullWidth"}
            onChange={(newValue) => handleTabChange(newValue)}
            color={COLOR.secondary_blue}
            sx={{
              backgroundColor: COLOR.secondary_white,
              marginTop: 4,
              marginBottom: 2,
            }}
          />
        )}
        {tabValue === 1 && !sectionLoading ? (
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
              rows={candidateList}
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
        ) : tabValue === 0 && !sectionLoading ? (
          <>
            <Box sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 2,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    marginLeft: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontStyle: "italic",
                      fontWeight: "700",
                      color: COLOR.primary_green,
                    }}
                  >
                    {posts.numberOfElements}&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      color: COLOR.primary_black_placeholder,
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    kết quả
                  </Typography>
                </Box>
                {isAdmin && (
                  <Button
                    variant="contained"
                    onClick={handleCreateRecruitmentClick}
                    sx={{
                      backgroundColor: COLOR.primary_gold,
                      color: COLOR.primary_black,
                      borderRadius: 2,
                    }}
                  >
                    <AddCircleRoundedIcon />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        marginLeft: "4px",
                        textTransform: "capitalize",
                      }}
                    >
                      Đăng Bài tuyển dụng
                    </Typography>
                  </Button>
                )}
              </Box>
              <Grid container spacing={4}>
                {posts.numberOfElements > 0 ? (
                  <>
                    {posts.content.map((post) => (
                      <RecruitmentCard
                        key={post?.id}
                        title={post?.title}
                        description={post?.content}
                        // location={post?.location}
                        isAdmin={isAdmin}
                        onClick={() => handleRecruitmentClick(post?.id)}
                      />
                    ))}
                  </>
                ) : (
                  <Grid
                    size={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      Chưa có bài đăng tuyển dụng nào
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={posts.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      "&.Mui-selected": {
                        backgroundColor: COLOR.primary_gold,
                        color: COLOR.primary_black,
                      },
                      "&:hover": {
                        backgroundColor: COLOR.secondary_gold,
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default CrewRecruitment;

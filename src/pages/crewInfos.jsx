import React, { useState, useEffect } from "react";
import {
  PageTitle,
  NoValuesOverlay,
  SearchBar,
  SwitchBar,
} from "../components/global";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { useNavigate } from "react-router";
import { getAllCrewMemberAPI } from "../services/crewServices";
import HttpStatusCodes from "../assets/constants/httpStatusCodes";
import { isoStringToAppDateString } from "../utils/ValueConverter";

const CrewInfos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [crewMembers, setCrewMembers] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [sectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    const fetchCrewMembers = async (official) => {
      setLoading(true);
      try {
        const response = await getAllCrewMemberAPI(0, 10, official);
        await new Promise((resolve) => setTimeout(resolve, 200)); // delay UI for 200ms

        if (response.status === HttpStatusCodes.OK) {
          console.log(response.data.content);
          setCrewMembers(response.data.content);
        } else {
          console.log("Error when fetching crew members: ", response);
        }
      } catch (err) {
        console.error("Error when fetching crew members: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrewMembers(true);
  }, []);

  const onMemberDetailClick = (id) => {
    navigate(`/crews/${id}`, { state: { official: tabValue === 0 ? true : false } });
  };

  const fetchCrewMemberTabChange = async (official) => {
    setSectionLoading(true);
    try {
      const response = await getAllCrewMemberAPI(0, 10, official);
      await new Promise((resolve) => setTimeout(resolve, 200)); // delay UI for 200ms

      if (response.status === HttpStatusCodes.OK) {
        setCrewMembers(response.data.content);
      } else {
        console.log("Error when fetching crew members: ", response);
      }
    } catch (err) {
      console.error("Error when fetching crew members: ", err);
    } finally {
      setSectionLoading(false);
    }
  }

  const onCreateCrewContractClick = async (id) => {
    navigate(`/crew-contracts/create/${id}`);
  }
    
  const handleTabChange = async (newValue) => {
    if(newValue === 1){
      await fetchCrewMemberTabChange(false);
      setTabValue(newValue);
    } else{
      await fetchCrewMemberTabChange(true);
      setTabValue(newValue);
    }
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
            {params.value === "MALE"
              ? "Nam"
              : params.value === "FEMALE"
              ? "Nữ"
              : "Khác"}
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
          {isoStringToAppDateString(params.value)}
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
      flex: 1.5,
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
            {tabValue === 1 && (
              <Button
                variant="contained"
                size="small"
                onClick={() => onCreateCrewContractClick(params?.id)}
                sx={{
                  backgroundColor: COLOR.primary_gold,
                  color: COLOR.primary_black,
                  fontWeight: 700,
                  textTransform: "capitalize",
                  marginRight: "8px",
                }}
              >
                <AssignmentIndOutlinedIcon
                  sx={{
                    width: 18,
                    height: 18,
                    marginTop: "3px",
                    marginBottom: "3px",
                  }}
                />
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={() => onMemberDetailClick(params?.id)}
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
            title="THÔNG TIN THUYỀN VIÊN"
            subtitle="Danh sách Thuyền viên công ty"
          />
        </Box>
        <SwitchBar
          tabLabel1={"Danh sách Thuyền viên chính thức"}
          tabLabel2={"Danh sách Thuyền viên chưa chính thức"}
          variant={"fullWidth"}
          onChange={(newValue) => handleTabChange(newValue)}
          color={COLOR.secondary_blue}
          sx={{
            backgroundColor: COLOR.secondary_white,
            marginTop: 4,
          }}
        />
        {!sectionLoading ? (
          <Box
            m="24px 0 0 0"
            height="80vh"
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingBottom: 2,
                justifyContent: "space-between",
              }}
            >
              <SearchBar
                placeholder={
                  "Nhập thông tin thuyền viên cần tìm kiếm (VD: Tên thuyền viên, Chức vụ,...)"
                }
                color={COLOR.primary_black}
                backgroundColor={COLOR.secondary_white}
                sx={{
                  width: "40%",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: COLOR.primary_gold,
                  color: COLOR.primary_black,
                  borderRadius: 2,
                }}
                onClick={() =>
                  navigate("/recruitment", {
                    state: {
                      tabValue: 1,
                      candidateStatus: "WAIT_FOR_INTERVIEW",
                    },
                  })
                }
              >
                <AddCircleRoundedIcon />
                <Typography
                  sx={{
                    fontWeight: 700,
                    marginLeft: "4px",
                    textTransform: "capitalize",
                  }}
                >
                  Thêm thuyền viên
                </Typography>
              </Button>
            </Box>
            <DataGrid
              disableRowSelectionOnClick
              disableColumnMenu
              disableColumnResize
              rows={crewMembers}
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

export default CrewInfos;

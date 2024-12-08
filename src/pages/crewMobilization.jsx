import React, { useState } from "react";
import { PageTitle, NoValuesOverlay, SwitchBar } from "../components/global";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { masterAssignmentSchedule } from "../data/mockData";
import { ShipInfoCard, ScheduleCard } from "../components/mobilization";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
// import { useNavigate } from "react-router";

const CrewInfos = () => {
  // const navigate = useNavigate();

  const onMemberDetailClick = (id) => {
    console.log("Navigate to detail page of mobilization with ID: " + id);
  };

  const columns = [
    {
      field: "id",
      headerName: "Mã ĐĐ",
      sortable: false,
      flex: 0.75,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "partnerName",
      headerName: "Tên công ty",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "shipInfo",
      headerName: "Thông tin tàu",
      sortable: false,
      flex: 3,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ShipInfoCard
            IMONumber={params?.row?.shipInfo?.IMONumber}
            name={params?.row?.shipInfo?.name}
            countryCode={params?.row?.shipInfo?.countryCode}
            type={params?.row?.shipInfo?.type}
            imageUrl={params?.row?.shipInfo?.imageUrl}
          />
        );
      },
    },
    {
      field: "schedule",
      headerName: "Lịch trình",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <ScheduleCard
            startLocation={params?.row?.startLocation}
            startDate={params?.row?.startDate}
            endLocation={params?.row?.endLocation}
            estimatedEndTime={params?.row?.estimatedEndTime}
          />
        );
      },
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
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
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
              Chi tiết
            </Button>
          </div>
        );
      },
    },
  ];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="LỊCH ĐIỀU ĐỘNG"
            subtitle="Thông tin các điều động đã tạo"
          />
        </Box>
        <SwitchBar
          tabLabel1={"Danh Sách"}
          tabLabel2={"Thời Gian Biểu"}
          variant={"fullWidth"}
          onChange={(newValue) => handleTabChange(newValue)}
          color={COLOR.secondary_blue}
          sx={{
            backgroundColor: COLOR.secondary_white,
          }}
        />
        {tabValue === 0 ? (
          <Box
            m="40px 0 0 0"
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                paddingBottom: 2,
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
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
                  Tạo điều động
                </Typography>
              </Button>
            </Box>
            <DataGrid
              disableRowSelectionOnClick
              disableColumnMenu
              disableColumnResize
              getRowHeight={() => "auto"}
              rows={masterAssignmentSchedule}
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
          <Box m="40px 0 0 0" height="62vh" maxHeight={550} maxWidth={1600}>
            <Typography>THỜI GIAN BIỂU</Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default CrewInfos;

import React from "react";
import { PageTitle, NoValuesOverlay } from "../components/global";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockCrewMemberInfos } from "../data/mockData";
import { COLOR } from "../assets/Color";
// import { useNavigate } from "react-router";

const CrewInfos = () => {
  // const navigate = useNavigate();

  const onMemberDetailClick = (id) => {
    console.log("Navigate to info page of Member with ID: " + id);
  };

  const columns = [
    {
      field: "id",
      headerName: "Mã TV",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "position",
      headerName: "Chức vụ",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params?.name,
    },
    {
      field: "workExp",
      headerName: "Số năm KN",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "detail",
      headerName: "Chi tiết",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
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
        );
      },
    },
  ];

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="THÔNG TIN THUYỀN VIÊN"
            subtitle="Danh sách Thuyền viên công ty"
          />
        </Box>
        <Box
          m="40px 0 0 0"
          height="70vh"
          maxHeight={550}
          maxWidth={1600}
          backgroundColor="#FFFFFF"
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
            rows={mockCrewMemberInfos}
            columns={columns}
            slots={{ noRowsOverlay: NoValuesOverlay }}
            pageSizeOptions={[5, 10, { value: -1, label: "All" }]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            sx={{
              headerAlign: "center",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: 16,
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CrewInfos;

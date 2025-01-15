import React from "react";
import { PageTitle, NoValuesOverlay, SearchBar } from "../components/global";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockSupplyContracts } from "../data/mockData";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router";

const SupplyContract = () => {
  const navigate = useNavigate();

  const onMemberDetailClick = (id) => {
    navigate(`/supply-contracts/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "Mã TV",
      sortable: false,
      flex: 0.75,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "parties",
      headerName: "Tên công ty",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => params?.name,
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      sortable: false,
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "activationDate",
      headerName: "Ngày bắt đầu",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "expiredDate",
      headerName: "Ngày kết thúc",
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
        );
      },
    },
  ];

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="HỢP ĐỒNG CUNG ỨNG"
            subtitle="Danh sách các hợp đồng cung ứng thuyền viên"
          />
        </Box>
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
            <SearchBar
              placeholder={
                "Nhập tên hoặc mã thuyền viên cần tìm kiếm (VD: Nguyễn Văn A,...)"
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
              onClick={() => navigate("/supply-contracts/create")}
            >
              <AddCircleRoundedIcon />
              <Typography
                sx={{
                  fontWeight: 700,
                  marginLeft: "4px",
                  textTransform: "capitalize",
                }}
              >
                Tạo hợp đồng
              </Typography>
            </Button>
          </Box>
          <DataGrid
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            rows={mockSupplyContracts}
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
      </Box>
    </div>
  );
};

export default SupplyContract;

import React from "react";
import { PageTitle } from "../components/global";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockCrewMemberInfos } from "../data/mockData";

const CrewInfos = () => {
    const columns = [
      { field: "id", headerName: "Mã TV", sortable: false },
      { field: "fullName", headerName: "Họ tên", sortable: false },
      { field: "dob", headerName: "Ngày sinh", sortable: false },
      { field: "phoneNumber", headerName: "SĐT", sortable: false },
      { field: "position.name", headerName: "Chức vụ", sortable: false },
      { field: "workExp", headerName: "Số năm KN", sortable: false },
      { field: "detail", headerName: "Chi tiết", sortable: false },
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
          height="75vh"
          maxHeight={550}
          maxWidth={1300}
          backgroundColor="#9f9"
        >
          <DataGrid
            disableRowSelectionOnClick={true}
            rows={mockCrewMemberInfos}
            columns={columns}
            autoPageSize={5}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CrewInfos;

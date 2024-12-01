import React from "react";
import { PageTitle } from "../components/global";
import { Box } from "@mui/material";

const SupplyContract = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="HỢP ĐỒNG CUNG ỨNG"
            subtitle="Danh sách các hợp đồng cung ứng thuyền viên"
          />
        </Box>
      </Box>
    </div>
  );
};

export default SupplyContract;

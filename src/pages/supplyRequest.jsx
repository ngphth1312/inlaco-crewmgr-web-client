import React from "react";
import { PageTitle } from "../components/global";
import { Box } from "@mui/material";

const SupplyRequest = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="YÊU CẦU CUNG ỨNG"
            subtitle="Danh sách các yêu cầu cung ứng thuyền viên"
          />
        </Box>
      </Box>
    </div>
  );
};

export default SupplyRequest;

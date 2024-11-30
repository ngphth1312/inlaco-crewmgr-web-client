import React from "react";
import { Header } from "../components/global";
import { Box } from "@mui/material";

const TemplateContract = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <Header
            title="MẪU HỢP ĐỒNG"
            subtitle="Danh sách các template mẫu của các loại hợp đồng"
          />
        </Box>
      </Box>
    </div>
  );
};

export default TemplateContract;

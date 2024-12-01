import React from "react";
import { PageTitle } from "../components/global";
import { Box } from "@mui/material";

const TemplateContract = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="MẪU HỢP ĐỒNG"
            subtitle="Danh sách các template mẫu của các loại hợp đồng"
          />
        </Box>
      </Box>
    </div>
  );
};

export default TemplateContract;

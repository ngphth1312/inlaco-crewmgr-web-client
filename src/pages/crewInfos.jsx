import React from "react";
import { Header } from "../components/global";
import { Box } from "@mui/material";

const CrewInfos = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <Header
            title="THÔNG TIN THUYỀN VIÊN"
            subtitle="Danh sách Thuyền viên công ty"
          />
        </Box>
      </Box>
    </div>
  );
};

export default CrewInfos;

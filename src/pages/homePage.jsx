import React from "react";
import { Header } from "../components/global";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Box m="20px">
        <Box>
          <Header
            title="TRANG CHỦ"
            subtitle="Trang chủ website quản lý của công ty INLACO Hải Phòng"
          />
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;

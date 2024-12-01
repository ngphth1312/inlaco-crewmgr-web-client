import React from "react";
import { PageTitle } from "../components/global";
import { Box } from "@mui/material";


const HomePage = () => {
  return (
    <div>
      <Box m="20px">
        <PageTitle
          title="TRANG CHỦ"
          subtitle="Trang chủ website quản lý của công ty INLACO Hải Phòng"
        />
        
      </Box>
    </div>
  );
};

export default HomePage;

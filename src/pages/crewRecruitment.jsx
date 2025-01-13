import React, { useState } from "react";
import { Pagination, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageTitle, } from "../components/global";
import { RecruitmentCard } from "../components/other";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate } from "react-router";

const CrewRecruitment = () => {
  const navigate = useNavigate();

  const handleCreateRecruitmentClick = () => {
    navigate("/createRecruitment");
  }

  const isAdmin = true; //this later will be replaced by the actual role of the user when fetching API

  // Mock recruitment data
  const recruitmentPosts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Recruitment Title ${i + 1}`,
    description: `This is the description for recruitment post ${
      i + 1
    }. In this job, you will participate as a role of a Something for our company. Your main job is to always be ready to be mobilization to ship from our partner company that request for a crew supply for there ship. We would like to work with workers who are keen on their job and do something for the company. You will receive salary as well of course babe`,
    location: "Hà Nội",
  }));

  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  // Calculate posts for the current page
  const currentPosts = recruitmentPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="TUYỂN DỤNG"
            subtitle="Danh sách các bài đăng tuyển dụng Thuyền viên"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 2,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "right", marginLeft: 1 }}>
            <Typography
              sx={{
                fontSize: 16,
                fontStyle: "italic",
                fontWeight: "700",
                color: COLOR.primary_green,
              }}
            >
              {recruitmentPosts.length}&nbsp;
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                color: COLOR.primary_black_placeholder,
                fontStyle: "italic",
              }}
            >
              {" "}
              kết quả
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleCreateRecruitmentClick}
            sx={{
              backgroundColor: COLOR.primary_gold,
              color: COLOR.primary_black,
              borderRadius: 2,
            }}
          >
            <AddCircleRoundedIcon />
            <Typography
              sx={{
                fontWeight: 700,
                marginLeft: "4px",
                textTransform: "capitalize",
              }}
            >
              Thêm Bài tuyển dụng
            </Typography>
          </Button>
        </Box>
        <Box sx={{}}>
          <Grid container spacing={4}>
            {currentPosts.map((post) => (
              <RecruitmentCard
                key={post?.id}
                title={post?.title}
                description={post?.description}
                location={post?.location}
                isAdmin={isAdmin}
                onClick={() => navigate(`/recruitmentDetail/${post?.id}`)}
              />
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(recruitmentPosts.length / postsPerPage)}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    backgroundColor: COLOR.primary_gold,
                    color: COLOR.primary_black,
                  },
                  "&:hover": {
                    backgroundColor: COLOR.secondary_gold,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CrewRecruitment;

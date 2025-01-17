import React, { useState, useEffect } from "react";
import { Pagination, Box, Typography, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PageTitle, } from "../components/global";
import { RecruitmentCard } from "../components/other";
import { COLOR } from "../assets/Color";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNavigate, useLocation } from "react-router";
import { useAppContext } from "../contexts/AppContext";
import HttpStatusCodes from "../assets/constants/httpStatusCodes";
import { getAllPostAPI } from "../services/postServices";

const CrewRecruitment = () => {
  const navigate = useNavigate();
  const { roles } = useAppContext();
  const isAdmin = roles.includes("ADMIN");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getAllPostAPI(0, 10);
        await new Promise((resolve) => setTimeout(resolve, 400)); //Delay the reader for 400ms

        if (response.status === HttpStatusCodes.OK) {
          console.log(response.data);
          setPosts(response.data);
        } else{
          console.error("Error when fetching posts: ", response);
        }
      } catch (error) {
        console.error("Error when fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [])

  const handleCreateRecruitmentClick = () => {
    navigate("/recruitment/create");
  }

  const handleRecruitmentClick = (id) => {
    navigate(`/recruitment/${id}`, { state: { isAdmin: isAdmin } });
  };

  const [page, setPage] = useState(1);

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
              {posts.numberOfElements}&nbsp;
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
          {isAdmin && (
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
                Đăng Bài tuyển dụng
              </Typography>
            </Button>
          )}
        </Box>
        <Box sx={{}}>
          <Grid container spacing={4}>
            {posts.numberOfElements > 0 ? (
              <>
                {posts.content.map((post) => (
                  <RecruitmentCard
                    key={post?.id}
                    title={post?.title}
                    description={post?.content}
                    // location={post?.location}
                    isAdmin={isAdmin}
                    onClick={() => handleRecruitmentClick(post?.id)}
                  />
                ))}
              </>
            ) : (
              <Grid size={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,}}>
                <Typography sx={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>Chưa có bài đăng tuyển dụng nào</Typography>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={posts.totalPages}
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

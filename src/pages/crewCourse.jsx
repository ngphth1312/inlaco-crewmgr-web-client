import React from "react";
import { PageTitle, } from "../components/global";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLOR } from "../assets/Color";
import { CourseCard } from "../components/other";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { mockCourses } from "../data/mockData";
import { useNavigate } from "react-router";

const CrewCourse = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="ĐÀO TẠO"
            subtitle="Danh sách các Khóa học hiện có"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingBottom: 4,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLOR.primary_gold,
              color: COLOR.primary_black,
              borderRadius: 2,
            }}
            onClick={() => navigate("/courses/create")}
          >
            <AddCircleRoundedIcon />
            <Typography
              sx={{
                fontWeight: 700,
                marginLeft: "4px",
                textTransform: "capitalize",
              }}
            >
              Tạo khóa học
            </Typography>
          </Button>
        </Box>
        <Grid container spacing={4}>
          {mockCourses.map((item) => {
            return (
              <CourseCard
                key={item?.id}
                name={item?.name}
                description={item?.description}
                courseImage={item?.courseImage}
                trainingPartner={item?.trainingPartner}
                trainingPartnerLogo={item?.trainingPartnerLogo}
                limitStudent={item?.limitStudent}
                isCertificateCourse={item?.isCertificateCourse}
                onClick={() => navigate(`/courses/${item?.id}`)}
              />
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default CrewCourse;

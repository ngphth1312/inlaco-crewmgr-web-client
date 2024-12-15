import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLOR } from "../../assets/Color";

const RecruitmentCard = ({ id, title, description, location, gridSize = 12, sx = [], onClick }) => {

  return (
    <Grid size={gridSize} key={id} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Card sx={{ borderRadius: 5, padding: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "80%" }}>
            <Typography variant="h4" sx={{ fontWeight: "600", color: COLOR.primary_black }} gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                color: COLOR.secondary_black
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "20%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button variant="contained" sx={{ backgroundColor: COLOR.secondary_blue }}>Ứng tuyển ngay</Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default RecruitmentCard;
import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLOR } from "../../assets/Color";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const RecruitmentCard = ({ title, description, location, gridSize = 12, sx = [], onClick, ...props }) => {
  return (
    <Grid {...props} size={gridSize} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Card
        sx={{
          borderRadius: 5,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.005)", // Slight zoom
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Darker shadow
          },
        }}
      >
        <Box sx={{ display: "flex", position: "relative", padding: 4 }}>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              top: 20,
              right: 32,
              alignItems: "center",
            }}
          >
            <LocationOnRoundedIcon
              sx={{
                width: 20,
                height: 20,
                marginRight: "4px",
                color: COLOR.primary_gray,
              }}
            />
            <Typography sx={{ fontSize: 14, color: COLOR.primary_gray }}>
              {location}
            </Typography>
          </Box>
          <Box sx={{ width: "80%" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                color: COLOR.primary_black,
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              gutterBottom
            >
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
                color: COLOR.secondary_black,
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
            <Button
              variant="contained"
              sx={{ backgroundColor: COLOR.secondary_blue }}
            >
              Ứng tuyển ngay
            </Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default RecruitmentCard;

import React, { useState } from "react";
import { Card, CardMedia, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Input = styled("input")({
  display: "none",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  transition: "opacity 0.3s",
  "&:hover": {
    opacity: 1,
  },
});

const HorizontalImageInput = ({ image, onClick, onImageChange, width, height, sx = [] }) => {
  return (
    <Card
      sx={[
        {
          width: width,
          height: height,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Input
        accept="image/*"
        id="upload-photo"
        type="file"
        onChange={onImageChange}
      />
      <CardMedia
        component="img"
        image={
          image ? image : require("../../assets/images/no-card-photo-3x4.png")
        }
        alt="Selected Card Photo"
        sx={{
          width: width,
          height: height,
        }}
      />
      <Overlay>
        <IconButton onClick={onClick}>
          <AddCircleRoundedIcon width={48} height={48} />
        </IconButton>
      </Overlay>
    </Card>
  );
};

export default HorizontalImageInput;

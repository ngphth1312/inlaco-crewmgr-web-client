import React, { useState } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Input = styled('input')({
    display: 'none',
});

const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.3s',
    '&:hover': {
        opacity: 1,
    },
});

const CardPhotoInput = ({ image, onClick, onImageChange, sx = [] }) => {
    return (
      <Card
        sx={[
          {
            maxWidth: 124,
            minHeight: 166,
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
            width: 124,
            height: 166,
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

export default CardPhotoInput;
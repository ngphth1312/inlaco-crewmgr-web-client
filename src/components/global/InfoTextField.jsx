import React from "react";
import { TextField } from "@mui/material";
import { COLOR } from "../../assets/Color";

const InfoTextField = ({ sx, slotProps, multiline, minRow, maxRow, rows, ...props }) => {
  return (
    <TextField
      {...props}
      multiline={multiline}
      rows={rows}
      sx={[
        { backgroundColor: "#FFF", marginBottom: 1 },
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          "& .Mui-disabled": {
            color: COLOR.primary_black, // Keep text color the same
            WebkitTextFillColor: COLOR.primary_black, // Keep text color the same for Safari
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: COLOR.primary_black, // Keep border color the same
            },
          },
        },
      ]} // Merging styles with spread operator
      slotProps={{
        formHelperText: {
          sx: {
            margin: 0,
            paddingRight: 1,
            paddingLeft: 1,
            backgroundColor: COLOR.primary_white,
          },
        },
        ...slotProps, // Merging slotProps with spread operator
      }}
    />
  );
};

export default InfoTextField;
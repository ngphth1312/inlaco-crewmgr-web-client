import React from "react";
import { TextField } from "@mui/material";
import { COLOR } from "../../assets/Color";

const StyledTextField = ({ sx, slotProps, ...props }) => {
  return (
    <TextField
      {...props}
      sx={[
        { backgroundColor: "#FFF", marginBottom: 1 },
        ...(Array.isArray(sx) ? sx : [sx]),
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

export default StyledTextField;
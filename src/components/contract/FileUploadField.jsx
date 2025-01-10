import React, { useState } from "react";
import { Button, IconButton, Box, } from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { COLOR } from "../../assets/Color";
import { useField, useFormikContext } from "formik";

const FileUploadField = ({ name, sx = [], ...props }) => {
  
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleFileChange = (event) => {
    setFieldValue(name, event.target.files[0]);
  };

  const handleDelete = () => {
    setFieldValue(name, null);
  };

  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "50%",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <p
        style={{
          marginRight: 4,
          fontSize: 16,
          color: COLOR.primary_black_placeholder,
        }}
      >
        File hợp đồng:{" "}
      </p>
      {!field.value ? (
        <label>
          <input
            id="file-upload"
            type="file"
            accept=".doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            onClick={() => document.getElementById("file-upload").click()}
            variant="contained"
          >
            Tải lên tệp
          </Button>
        </label>
      ) : (
        <Box>
          <a href={URL.createObjectURL(field.value)} download={field.value.name}>
            {field.value.name}
          </a>
          <IconButton
            onClick={handleDelete}
            sx={{ color: COLOR.primary_orange }}
          >
            <DeleteForeverRoundedIcon sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadField;
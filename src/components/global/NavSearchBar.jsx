import {
  Box,
  IconButton,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { COLOR } from "../../assets/Color";
import { useNavigate } from "react-router";
import { useState } from "react";

// Main pages of the web
const pages = [
  { label: "Trang chủ", path: "/homePage" },
  { label: "Thông tin thuyền viên", path: "/crewInfos" },
  { label: "Lịch điều động", path: "/crewMobilization" },
  { label: "Hợp đồng thuyền viên", path: "/crewContract" },
  { label: "Hợp đồng cung ứng", path: "/supplyContract" },
  { label: "Mẫu hợp đồng", path: "/templateContract" },
  { label: "Yêu cầu cung ứng", path: "/supplyRequest" },
  { label: "Tuyển dụng", path: "/crewRecruitment" },
  { label: "Đào tạo", path: "/crewCourse" },
];

const NavSearchBar = ({
  placeholder,
  value,
  backgroundColor = COLOR.primary_white,
  color = COLOR.primary_black,
  sx = [],
  onChange,
  onSearchClick,
}) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleNavigate = (event, value) => {
    if (value) {
      navigate(value.path); // Navigate to the selected page
    }
  };

  return (
    <Autocomplete
      disableClearable
      options={pages} // Options for auto-suggestion
      getOptionLabel={(option) => option.label}
      onInputChange={handleInputChange}
      onChange={handleNavigate} // Handles navigation when an option is selected
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          "& .MuiAutocomplete-endAdornment": {
            display: "none", // Hides the dropdown icon
          },
        },
      ]}
      renderInput={(params) => (
        <Box
          display="flex"
          backgroundColor={backgroundColor}
          borderRadius="5px"
        >
          <TextField
            {...params}
            sx={{
              flex: 1,
              "& .MuiInputBase-input": {
                color: color, // Set the text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Removes the border
                },
                "&:hover fieldset": {
                  border: "none", // Removes the border on hover
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Removes the border when focused
                },
              },
            }}
            variant="outlined"
            size="small"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <IconButton
            onClick={onSearchClick}
            type="button"
            sx={{ p: 1, color: color }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ padding: 1 }}>
          {option.label}
        </Box>
      )}
    />
  );
};

export default NavSearchBar;

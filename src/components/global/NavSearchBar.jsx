import {
  Box,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { COLOR } from "../../assets/Color";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

// Main pages of the web
const pages = [
  { label: "Trang chủ", path: "/" },
  { label: "Thông tin thuyền viên", path: "/crews" },
  { label: "Lịch điều động", path: "/mobilizations" },
  { label: "Hợp đồng thuyền viên", path: "/crew-contracts" },
  { label: "Hợp đồng cung ứng", path: "/supply-contracts" },
  { label: "Mẫu hợp đồng", path: "/template-contracts" },
  { label: "Yêu cầu cung ứng", path: "/supply-requests" },
  { label: "Tuyển dụng", path: "/recruitment" },
  { label: "Đào tạo", path: "/courses" },
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
  const { roles } = useAppContext();

  const testRoles = ["ADMIN", "USER"];
  const isAdmin = testRoles.includes("ADMIN");

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const handleNavigate = (event, value) => {
    if (value) {
      navigate(value.path, isAdmin); // Navigate to the selected page
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
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box component="li" key={key} {...otherProps} sx={{ padding: 1 }}>
            {option.label}
          </Box>
        );
      }}
    />
  );
};

export default NavSearchBar;

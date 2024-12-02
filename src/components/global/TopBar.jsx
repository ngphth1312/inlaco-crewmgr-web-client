import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { COLOR } from "../../assets/Color";
import SearchBar from "./SearchBar"

const TopBar = () => {

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <SearchBar
        placeholder={"Tìm kiếm"}
        backgroundColor={COLOR.secondary_blue}
        color={COLOR.primary_white}
      />

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton>
          <LightModeOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <NotificationsOutlinedIcon sx={{ width: 28, height: 28 }} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ width: 28, height: 28 }} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon sx={{ width: 28, height: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;

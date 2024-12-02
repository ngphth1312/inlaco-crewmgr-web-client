import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { COLOR } from "../../assets/Color";

const TopBar = () => {

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={COLOR.secondary_blue}
        borderRadius="3px"
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: COLOR.primary_white }}
          placeholder="Tìm kiếm"
        />
        <IconButton type="button" sx={{ p: 1, color: COLOR.primary_white }}>
          <SearchIcon />
        </IconButton>
      </Box>

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

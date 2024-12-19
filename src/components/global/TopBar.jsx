import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { COLOR } from "../../assets/Color";
import NavSearchBar from "./NavSearchBar"
import { useAppContext } from "../../contexts/AppContext";
import { localStorage, sessionStorage, StorageKey } from "../../utils/storageUtils";
import { useNavigate } from "react-router";

const TopBar = () => {

  const navigate = useNavigate();
  const{ setAccessToken } = useAppContext();

  const handleLogoutClick = async () => {
    //Perform something and calling logout API to invalid the refresh token
    const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME)
    if(rememberMe){
      localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    } else{
      sessionStorage.removeItem(StorageKey.ACCESS_TOKEN);
    }

    localStorage.removeItem(StorageKey.REMEMBER_ME);
    setAccessToken("");
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{ width: "100%", height: "10%" }}>
      {/* SEARCH BAR */}
      <NavSearchBar
        placeholder={"Tìm kiếm trang......"}
        backgroundColor={COLOR.secondary_blue}
        color={COLOR.primary_white}
        sx={{ width: "20%", }}
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
        <IconButton onClick={() => handleLogoutClick()}>
          <PersonOutlinedIcon sx={{ width: 28, height: 28 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;

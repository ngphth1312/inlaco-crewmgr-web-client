import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Checkbox,
  Divider,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { COLOR } from "../assets/Color";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppContext } from "../contexts/AppContext";
import { localStorage, sessionStorage, StorageKey } from "../utils/storageUtils"

const LoginPage = () => {

  const { setAccessToken } = useAppContext();
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleOnLoginClick = async () => {
    //validate login inputs and calling API to login
    const mockAccessToken = "ashdajsikdnasd"; //Mock access token
    localStorage.setItem(StorageKey.REMEMBER_ME, rememberMe);

    if(rememberMe) {
    localStorage.setItem(StorageKey.ACCESS_TOKEN, mockAccessToken);
    } else{
    sessionStorage.setItem(StorageKey.ACCESS_TOKEN, mockAccessToken);
    }

    setAccessToken(mockAccessToken);
    navigate("/crewInfos", { replace: true });
  }

  return (
    <div className="login">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: COLOR.primary_white,
          width: 400,
          height: 550,
          borderRadius: 4,
        }}
      >
        <Box
          backgroundColor={COLOR.primary_blue}
          height="10%"
          width="100%"
          sx={{
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt="inlaco-logo"
            width="54"
            height="54"
            src={require("../assets/images/inlaco-logo.png")}
            style={{ cursor: "pointer" }}
          />
        </Box>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
        <Box
          sx={{
            flex: 1,
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 5,
            paddingRight: 5,
            width: "100%",
            paddingTop: 2,
          }}
        >
          <Typography
            mb={2}
            sx={{ fontSize: 28, fontWeight: 700, color: COLOR.primary_blue }}
          >
            Đăng nhập
          </Typography>
          {/* {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )} */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tên đăng nhập"
            id="username"
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              },
            }}
            // autoComplete="username"
            // name="username"
            // value={phoneNumber}
            // onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{
              backgroundColor: COLOR.secondary_white,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type={isShowPass ? "text" : "password"}
            id="password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      isShowPass ? setIsShowPass(false) : setIsShowPass(true);
                    }}
                  >
                    {isShowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              },
            }}
            // name="password"
            // autoComplete="current-password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: COLOR.secondary_white,
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "2px",
              marginBottom: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
                sx={{
                  padding: 0,
                  marginRight: "4px",
                  color: COLOR.primary_gray,
                  "&.Mui-checked": {
                    color: COLOR.primary_gray,
                  },
                }}
              />
              <Typography sx={{ color: COLOR.primary_gray, fontSize: 14 }}>
                Lưu đăng nhập
              </Typography>
            </Box>
            <NavLink
              style={({ isActive }) => ({
                fontSize: 14,
                color: isActive ? COLOR.primary_gray : COLOR.primary_gray, //adjust this if needed
              })}
            >
              Quên mật khẩu
            </NavLink>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              pt: 1,
              pb: 1,
              backgroundColor: COLOR.primary_blue,
              color: COLOR.primary_white,
            }}
            onClick={() => handleOnLoginClick()}
            // disabled={loading}
          >
            {/* {loading ? <CircularProgress size={24} /> : "Login"} */}
            Đăng nhập
          </Button>
          <Divider
            sx={{
              borderWidth: 1,
              borderColor: COLOR.primary_gray,
              width: "100%",
              marginTop: 3,
              marginBottom: 3,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Chưa có tài khoản?&nbsp;</Typography>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? COLOR.secondary_gold : COLOR.secondary_gold, //adjust this if needed
              })}
            >
              Tạo ở đây
            </NavLink>
          </Box>
        </Box>
        <Box
          backgroundColor={COLOR.primary_gray}
          height="16%"
          width="100%"
          sx={{
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color={COLOR.primary_white}
            sx={{
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2px",
            }}
          >
            CÔNG TY CỔ PHẦN HỢP TÁC LAO ĐỘNG VỚI NƯỚC NGOÀI
          </Typography>
          <Typography
            color={COLOR.primary_white}
            sx={{ fontSize: 8, textAlign: "center" }}
          >
            INTERNATIONAL LABOUR AND SERVICES STOCK COMPANY (INLACO - HP)
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;

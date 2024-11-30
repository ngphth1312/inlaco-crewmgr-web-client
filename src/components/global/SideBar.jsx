import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsBoatOutlinedIcon from "@mui/icons-material/DirectionsBoatOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { COLOR } from "../../assets/Color";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to} style={{textDecoration: 'none'}}>
      <MenuItem
        active={selected === title}
        style={{
          color: COLOR.primary_white,
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap", // Prevent text wrapping
            overflow: "hidden", // Hide overflowing text
            textOverflow: "ellipsis", // Add the ellipsis
            fontSize: 15,
          }}
        >
          {title}
        </Typography>
      </MenuItem>
    </Link>
  );
};

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={COLOR.primary_blue}
        style={{ height: "100%", }}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  backgroundColor: active ? COLOR.secondary_blue : undefined,
                  "&:hover": {
                    backgroundColor: COLOR.primary_hover_blue,
                  },
                };
            },
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: COLOR.primary_white,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img
                  src={require("../../assets/images/inlaco-logo.png")}
                  alt="INLACO Logo"
                  style={{ width: 60, height: 48 }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: COLOR.primary_white }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={require("../../assets/images/admin-avatar.jpg")}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={COLOR.primary_white}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Trần Võ Sơn Tùng
                </Typography>
                <Typography variant="h6" color={COLOR.primary_gold}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Trang chủ"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={COLOR.primary_gold}
              sx={{
                m: isCollapsed ? "15px 0 5px 0" : "15px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              {isCollapsed ? "TV" : "Thuyền Viên"}
            </Typography>
            <Item
              title="Thông tin Thuyền viên"
              to="/crewInfos"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Lịch điều động"
              to="/crewMobilization"
              icon={<DirectionsBoatOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={COLOR.primary_gold}
              sx={{
                m: isCollapsed ? "15px 0 5px 0" : "15px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              {isCollapsed ? "HĐ" : "Hợp Đồng"}
            </Typography>
            <Item
              title="Hợp đồng Thuyền viên"
              to="/crewContract"
              icon={<AssignmentIndOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hợp đồng Cung ứng"
              to="/supplyContract"
              icon={<RequestQuoteOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mẫu Hợp đồng"
              to="/templateContract"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={COLOR.primary_gold}
              sx={{
                m: isCollapsed ? "15px 0 5px 0" : "15px 0 5px 20px",
                textAlign: isCollapsed ? "center" : "left",
              }}
            >
              Khác
            </Typography>
            <Item
              title="Yêu cầu Cung ứng"
              to="/supplyRequest"
              icon={<MarkEmailUnreadOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tuyển dụng"
              to="/crewRecruitment"
              icon={<HowToRegOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đào tạo"
              to="/crewTraining"
              icon={<WorkspacePremiumOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;

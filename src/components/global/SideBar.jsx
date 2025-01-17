import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
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
import { useAppContext } from "../../contexts/AppContext";

const Item = ({ title, to, navigateState, icon, selected, setSelected }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set the selected state based on the current path
    const pathToTitleMap = {
      "/": "Trang chủ",
      "/crews": "Thông tin Thuyền viên",
      "/mobilizations": "Lịch điều động",
      "/crew-contracts": "Hợp đồng Thuyền viên",
      "/supply-contracts": "Hợp đồng Cung ứng",
      "/template-contracts": "Templates",
      "/supply-requests": "Yêu cầu Cung ứng",
      "/recruitment": "Tuyển dụng",
      "/courses": "Đào tạo",
    };

    const currentPath = location.pathname;
    const currentTitle = pathToTitleMap[currentPath] || "Trang chủ";
    setSelected(currentTitle);
  }, [location.pathname]);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: COLOR.primary_white,
      }}
      onClick={() => {
        setSelected(title);
        navigate(to, { state: navigateState });
      }}
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
  );
};

const SideBar = () => {
  const { accountName, roles } = useAppContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Trang chủ");

  const testRoles = ["ADMIN", "USER"];

  const isAdmin = roles.includes("ADMIN");
  const isCrewMember = roles.includes("SAILOR");
  const isGeneralUser = roles.includes("USER");

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={COLOR.primary_blue}
        style={{ height: "100%" }}
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
                  {accountName}
                </Typography>
                <Typography variant="h6" color={COLOR.primary_gold}>
                  {isAdmin ? "Admin" : isCrewMember ? "Crew Member" : "User"}
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
            {(isAdmin || isCrewMember) && ( //only show these items if user is admin or crew member
              <>
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
                {isCrewMember && !isGeneralUser && (
                  <Item
                    title="Hồ sơ cá nhân"
                    to="/my-profile"
                    icon={<AccountBoxRoundedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
                {isAdmin ? (
                  <>
                    <Item
                      title="Thông tin Thuyền viên"
                      to="/crews"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Lịch điều động"
                      to="/mobilizations"
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
                      to="/crew-contracts"
                      icon={<AssignmentIndOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Hợp đồng Cung ứng"
                      to="/supply-contracts"
                      icon={<RequestQuoteOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Templates"
                      to="/template-contracts"
                      icon={<DescriptionOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                ) : (
                  <>
                    <Item
                      title="Thông tin Thuyền viên"
                      to="/crews"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Lịch điều động"
                      to="/mobilizations"
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
                      to="/crew-contracts"
                      icon={<AssignmentIndOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
              </>
            )}
            {(isAdmin || (isGeneralUser && !isCrewMember)) && ( //only show these items if user is admin or general user
              <>
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
                  to="/supply-requests"
                  icon={<MarkEmailUnreadOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Tuyển dụng"
                  to="/recruitment"
                  icon={<HowToRegOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
            {(isAdmin || isCrewMember) && ( //only show this item if user is admin or crew member
              <>
                <Item
                  title="Đào tạo"
                  to="/courses"
                  icon={<WorkspacePremiumOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;

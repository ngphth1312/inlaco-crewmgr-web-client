import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { COLOR } from "../../assets/Color";

const ScheduleCard = ({
  backgroundColor = COLOR.primary_white,
  color = COLOR.primary_black,
  sx = [],
}) => {
  return (
    <Box
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      display="flex"
      backgroundColor={backgroundColor}
      borderRadius="3px"
    ></Box>
  );
};

export default ScheduleCard;

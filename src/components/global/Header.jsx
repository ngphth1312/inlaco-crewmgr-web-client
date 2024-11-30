import { Typography, Box } from "@mui/material";
import { COLOR } from "../../assets/Color";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h5"
        color={COLOR.primary_black}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Typography variant="h7" color={COLOR.secondary_black}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

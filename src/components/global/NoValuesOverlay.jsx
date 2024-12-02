import { Typography, Box } from "@mui/material";
import { COLOR } from "../../assets/Color";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";

const NoValuesOverlay = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%"}}>
      <TableRowsOutlinedIcon sx={{ width: 36, height: 36 }} />
      <Typography mt={1} variant="h6" color={COLOR.primary_black} fontWeight="bold">
        KHÔNG CÓ DỮ LIỆU
      </Typography>
    </Box>
  );
};

export default NoValuesOverlay;

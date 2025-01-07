import { Typography, Box } from "@mui/material";
import { COLOR } from "../../assets/Color";

const SectionDivider = ({ sectionName, color = COLOR.primary_black_placeholder, my = 3, sx }) => {
  return (
    <Box
      my={my}
      sx={[
        {
          width: "100%",
          borderBottom: `2px solid ${COLOR.primary}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography sx={{ fontSize: 18, color: color, fontStyle: "italic" }}>
        {sectionName}
      </Typography>
      <Box
        sx={{
          width: "100%",
          borderBottom: `2px solid ${color}`,
        }}
      />
    </Box>
  );
};

export default SectionDivider;

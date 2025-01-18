import React, { useState } from "react";
import { Tabs, Tab, Box, } from "@mui/material";

const SwitchBar = ({ tabLabel1, tabLabel2, variant, color, onChange, initialTab = 0, sx = [] }) => {
    const [value, setValue] = useState(initialTab);

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <Box maxWidth={1600} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Tabs
        value={value}
        onChange={handleValueChange}
        centered
        variant={variant}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: color,
          },
        }}
      >
        <Tab sx={{ fontWeight: 700, color: color }} label={tabLabel1} />
        <Tab sx={{ fontWeight: 700, color: color }} label={tabLabel2} />
      </Tabs>
    </Box>
  );
}

export default SwitchBar;
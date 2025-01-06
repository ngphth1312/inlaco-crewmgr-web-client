import React, { useState } from "react";
import { PageTitle, } from "../components/global";
import { CardPhotoInput } from "../components/contract";
import { Box, Button, Typography } from "@mui/material";
import { mockCrewMemberInfos } from "../data/mockData";
import { COLOR } from "../assets/Color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Add } from "@mui/icons-material";
// import { useNavigate } from "react-router";

const AddCrewMember = () => {
  // const navigate = useNavigate();

  const [image, setImage] = useState(null);
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Box m="20px">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <PageTitle
              title="THÊM THUYỀN VIÊN"
              subtitle="Thêm thuyền viên mới vào hệ thống"
            />
            <Button variant="contained" sx={{ width: "50%", padding: 1, color: COLOR.primary_black, backgroundColor: COLOR.primary_gold, }}>
              <Box sx={{ display: "flex", alignItems: "end", }}>
                <PersonAddIcon sx={{ marginRight: "5px", marginBottom: "1px", }} />
                <Typography sx={{ fontWeight: 700, }}>Thêm</Typography>
              </Box>
            </Button>
          </Box>
          <CardPhotoInput
            sx={{ marginRight: 5 }}
            image={image}
            onClick={() => document.getElementById("upload-photo").click()}
            onImageChange={handleImageChange}
          />
        </Box>
        <Box sx={{}}></Box>
      </Box>
    </div>
  );
};

export default AddCrewMember;

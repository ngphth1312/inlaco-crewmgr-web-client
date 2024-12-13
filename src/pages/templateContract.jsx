import React from "react";
import { PageTitle, SearchBar } from "../components/global";
import {
  Box, Button, Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLOR } from "../assets/Color";
import { TemplateContractCard } from "../components/contract"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const TemplateContract = () => {

  const mockData = [
    {
      id: "001",
      title: "Mẫu hợp đồng Cung ứng thuyền viên 1",
      description: "Hợp đồng Cung ứng",
      image: "https://i.sstatic.net/y9DpT.jpg",
    },
    {
      id: "002",
      title: "Mẫu hợp đồng Lao động thuyền viên 2",
      description: "Hợp đồng Lao động",
      image: "https://i.sstatic.net/y9DpT.jpg",
    },
    {
      id: "003",
      title: "Mẫu hợp đồng Lao động thuyền viên 3",
      description: "Hợp đồng Lao động",
      image: "ttps://i.sstatic.net/y9DpT.jpg",
    },
    {
      id: "004",
      title: "Mẫu hợp đồng Cung ứng thuyền viên 4",
      description: "Hợp đồng Cung ứng",
      image: "https://i.sstatic.net/y9DpT.jpg",
    },
    {
      id: "005",
      title: "Mẫu hợp đồng Lao động thuyền viên 5",
      description: "Hợp đồng Lao động",
      image: "https://i.sstatic.net/y9DpT.jpg",
    },
    {
      id: "006",
      title: "Mẫu hợp đồng Cung ứng thuyền viên 6",
      description: "Hợp đồng Cung ứng",
      image: "https://i.sstatic.net/y9DpT.jpg",
    },
  ];



  return (
    <div>
      <Box m="20px">
        <Box>
          <PageTitle
            title="MẪU HỢP ĐỒNG"
            subtitle="Danh sách các template của các loại hợp đồng"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            paddingBottom: 2,
            justifyContent: "space-between",
          }}
        >
          <SearchBar
            placeholder={
              "Nhập thông tin template hợp đồng (VD: Tên hợp đồng, Loại hợp đồng)"
            }
            color={COLOR.primary_black}
            backgroundColor={COLOR.secondary_white}
            sx={{
              width: "40%",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLOR.primary_gold,
              color: COLOR.primary_black,
              borderRadius: 2,
            }}
          >
            <AddCircleRoundedIcon />
            <Typography
              sx={{
                fontWeight: 700,
                marginLeft: "4px",
                textTransform: "capitalize",
              }}
            >
              Tạo template
            </Typography>
          </Button>
        </Box>
        <Grid container spacing={4}>
          {mockData.map((item) => {
            return (
              <TemplateContractCard
                id={item?.id}
                image={item?.image}
                title={item?.title}
                description={item?.description}
              />
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default TemplateContract;

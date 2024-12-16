import React from "react";
import { PageTitle, SearchBar } from "../components/global";
import {
  Box, Button, Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLOR } from "../assets/Color";
import { TemplateContractCard } from "../components/contract"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { mockTemplateContracts } from "../data/mockData"

const TemplateContract = () => {
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
            paddingBottom: 4,
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
          {mockTemplateContracts.map((item) => {
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

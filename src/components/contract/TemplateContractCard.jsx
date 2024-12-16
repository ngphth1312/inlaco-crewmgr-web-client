import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Box,
} from "@mui/material";
import { COLOR } from "../../assets/Color";
import { useState } from "react";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import Grid from "@mui/material/Grid2";

const TemplateContractCard = ({
  id,
  image,
  title,
  description,
  gridSize = 3,
  color = COLOR.primary_black,
  sx = [],
}) => {

  const [imageError, setImageError] = useState(false);

  return (
    <Grid key={id} size={gridSize} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Card
        sx={{
          position: "relative",
          borderRadius: 4,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)", // Slight zoom
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Darker shadow
          },
        }}
      >
        <Box sx={{ padding: 1 }}>
          <IconButton
            aria-label="download"
            sx={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
          >
            <DownloadForOfflineRoundedIcon
              sx={{ width: 32, height: 32, color: COLOR.primary_gray }}
            />
          </IconButton>
          <CardMedia
            component="img"
            height="180"
            image={
              imageError || image === ""
                ? require("../../assets/images/no-ship-photo.png")
                : image
            }
            alt={title}
            onError={() => {
              setImageError(true);
            }}
            sx={{ borderRadius: 3 }}
          />
          <CardContent sx={{ padding: 1 }}>
            <Typography
              variant="h6"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1, // Set the number of lines to show
                color: COLOR.primary_black,
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ margin: 0, color: COLOR.secondary_black }}
            >
              <strong>Loại:</strong> {description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default TemplateContractCard;

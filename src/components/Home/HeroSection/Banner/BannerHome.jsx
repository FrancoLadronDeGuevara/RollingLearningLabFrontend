import { Card, CardMedia } from "@mui/material";
import videoTest from "../../../../assets/video/video_test.mp4";
export const BannerHome = () => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
      }}
    >
      <CardMedia component="video" src={videoTest} autoPlay muted loop />
    </Card>
  );
};

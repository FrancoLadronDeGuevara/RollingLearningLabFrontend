import { Box } from "@mui/material";
import videoTest from "../../../../assets/video/video_test.mp4";
export const BannerHome = () => {
  return (
    <Box sx={{ overflow: "hidden", display:"flex", justifyContent:"center" }}>
      <video height="360" width="960" loop muted autoPlay>
        <source src={videoTest} type="video/mp4" />
      </video>
    </Box>
  );
};

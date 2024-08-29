import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
export function CarrouselWorkshop({data}) {

  return (
    <>
      <Box
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          overflow: "hidden",
          width: "100%",
          height: {xs:"100%"},
          paddingBlock: "1rem",
          marginBlock:"1rem"
        }}
      >
        <Swiper
          autoplay={{
            delay: 3000,
          }}
          spaceBetween={30}
          effect={"fade"}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Card sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="350"
                  image={item.imagen}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    backgroundImage:
                      "linear-gradient(to top, #111, rgba(250,250,250,0.1))",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Typography variant="h5" color={"#fff"}>
                    Speaker: {item.speaker}
                  </Typography>
                  <Typography variant="subtitle2" color={"#fff"}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}

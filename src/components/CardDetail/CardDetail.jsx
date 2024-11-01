import * as React from "react";
import { useSelector } from "react-redux";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import Loader from "../Loader/Loader";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { FavoriteHandler } from "../FavoriteHandler/FavoriteHandler";

export const CardDetail = ({id, isWorkshop, workOrEven, loading}) => {
  const { isAuthenticated } = useSelector((state) => state.user)
  const textColor = "#5D5D5D";
  const styleTitle = {
    color:"#3D3D3D",
    fontWeight:"600"
  }
  const stylesText = {
    fontSize: ".8rem",
    fontWeigth: "600",
    color:"#5D5D5D"
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Box
        sx={{
          marginBlock: "1.5rem",
          display: "grid",
          minHeight: {xs:"100vh", sm:"100%"},
          placeItems:{sm:"center"},
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: "1rem",
          paddingInline: ".5rem",
        }}
      >
        <Box>
          <Card sx={{ position:"relative", overflow: "hidden", borderRadius: { xs: "1rem"}, width:{sm:"400px"} }}>
            <CardMedia
              component={"img"}
              image={workOrEven?.imageBanner}
              title={workOrEven?.title}
              sx={{ height: { xs: "450px", sm:"auto" }}}
            />
            <Box sx={{position:"absolute", top:"1rem", right:"1rem"}}><FavoriteHandler id={id} isAuthenticated={isAuthenticated} isWorkshop={isWorkshop}/></Box>
          </Card>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {xs:"1rem", sm:"1.5rem"},
              paddingInline: ".5rem",
            }}
          >
            <Typography variant="h6" component="h1" sx={styleTitle}>
              {workOrEven?.title}
            </Typography>
           {
            isWorkshop && ( <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <RecordVoiceOverOutlinedIcon sx={{ color: `${textColor}` }} />
              <Typography sx={{ fontWeight: "550", color: `${textColor}` }}>
                {workOrEven?.speakers.toString() ?? "Sin speaker"}
              </Typography>
            </Box>)
           }
            {isWorkshop && (workOrEven?.attendees.length > 0 &&
              <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <Groups3OutlinedIcon sx={{ color: `${textColor}` }} />
              <Typography sx={{fontSize:".9rem", fontWeight: "500", color: `${textColor}` }}>
                {workOrEven?.attendees.toString()}
              </Typography>
            </Box>)
            }
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap:"wrap",
                gap: {xs:".5rem", sm:"1rem"},
                color: `${textColor}`,
              }}
            >
              <DateRangeOutlinedIcon />
              <Typography title="Fecha" sx={stylesText}>{workOrEven?.date}</Typography>
              | <AccessTimeOutlinedIcon />
              <Typography title="Comienzo" sx={stylesText}>
                {workOrEven?.startTime} Hs.
              </Typography>
              | {
                isWorkshop ? (<>
                <GroupOutlinedIcon />
              <Typography title="Usuarios registrados" sx={stylesText}>
                {workOrEven?.registeredUsers.length ?? "0"}
              </Typography>
                </>) : (<>
                  <AccessTimeOutlinedIcon />
              <Typography title="Finaliza" sx={stylesText}>
                {workOrEven?.endTime} Hs.
              </Typography>
                </>)
              }
              |<StarBorderOutlinedIcon />
              <Typography title="Likes" sx={stylesText}>{workOrEven?.likes.length ?? 0}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize:"1rem", fontWeight:"600", color:"#3D3D3D"}} component="h2">Descripción</Typography>
              <Typography sx={stylesText}>{workOrEven?.description}</Typography>
            </Box>
            <Button sx={{width:{sm:"10rem"}, paddingBlock:{xs:"1rem", sm:".5rem"},border:"1px solid #5D5D5D", borderRadius:"1rem", background:"#111",color:"#fefefe", "&:hover":{background:"#3D3D3D"}}}>{workOrEven?.status === "PENDIENTE" ? "registrarse" : "ver"}</Button>
          </Box>{/*!TODO: separar boton */}
        </Box>
      </Box>
  );
};

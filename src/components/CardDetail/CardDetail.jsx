import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkshop } from "../../redux/actions/workshop.actions";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import Loader from "../Loader/Loader";
import { Box, Button, Card, CardMedia, Container, Typography } from "@mui/material";

export const CardDetail = ({id}) => {
  const dispatch = useDispatch();
  const { workshop, loading } = useSelector((state) => state.workshop);
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
  React.useEffect(() => {
    dispatch(getWorkshop(id));
  }, []);
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
          <Card sx={{ overflow: "hidden", borderRadius: { xs: "1rem"}, width:{sm:"400px"} }}>
            <CardMedia
              component={"img"}
              image={workshop?.imageBanner}
              title={workshop?.title}
              sx={{ height: { xs: "500px", sm:"auto" }}}
            />
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
              {workshop?.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <RecordVoiceOverOutlinedIcon sx={{ color: `${textColor}` }} />
              <Typography sx={{ fontWeight: "550", color: `${textColor}` }}>
                {workshop?.speakers.toString() ?? "Sin speaker"}
              </Typography>
            </Box>
            {workshop?.attendees > 0 && 
              <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <Groups3OutlinedIcon sx={{ color: `${textColor}` }} />
              <Typography sx={{fontSize:".9rem", fontWeight: "500", color: `${textColor}` }}>
                {workshop?.attendees.toString()}
              </Typography>
            </Box>
            }
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: {xs:".5rem", sm:"1rem"},
                color: `${textColor}`,
              }}
            >
              <DateRangeOutlinedIcon />
              <Typography title="Fecha" sx={stylesText}>{workshop?.date}</Typography>
              | <AccessTimeOutlinedIcon />
              <Typography title="Comienzo" sx={stylesText}>
                {workshop?.startTime} Hs.
              </Typography>
              | <GroupOutlinedIcon />
              <Typography title="Usuarios registrados" sx={stylesText}>
                {workshop?.registeredUsers[0] ?? "0"}
              </Typography>
              |<StarBorderOutlinedIcon />
              <Typography title="Likes" sx={stylesText}>{workshop?.likes[0] ?? 0}</Typography>
            </Box>
            <Box>
              <Typography sx={{fontSize:"1rem", fontWeight:"600", color:"#3D3D3D"}} component="h2">Descripción</Typography>
              <Typography sx={stylesText}>{workshop?.description}</Typography>
            </Box>
            <Button sx={{border:"1px solid #5D5D5D", borderRadius:"1rem", background:"#111",color:"#fefefe", "&:hover":{background:"#3D3D3D"}}}>Registrate</Button>
          </Box>{/*!TODO: separar boton */}
        </Box>
      </Box>
  );
};

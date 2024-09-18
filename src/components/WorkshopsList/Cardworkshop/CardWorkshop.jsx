import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import { Box, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
// import { grey } from "@mui/material/colors";

export function CardWorkshop({ item }) {
  const [newHeight, setNewHeight] = useState("15vh");
  const [isFav, setIsFav] = useState(false);
  const handleFav = () =>  setIsFav(!isFav);
  const handleHeight = () => {
    if(newHeight === "15vh"){
      setNewHeight("20vh")
    }else{
      setNewHeight("15vh")
    }
  }
  return (
    <Card
      sx={{
        width: "300px",
        height: "380px",
        position: "relative",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <CardMedia
        component="img"
        alt={item.title}
        sx={{ position: "absolute", height: "100%" }}
        image={item.imageBanner}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          backgroundImage:
            "linear-gradient(to top, #000, rgba(250,250,250,0.1))",
          width: "100%",
          height: "100%",
          zIndex: "0",
        }}
      />
      <IconButton
        sx={{ position: "absolute", top: "1rem", right: ".5rem"}}
        onClick={() => handleFav()}
      >
        {isFav ? <FavoriteIcon sx={{color:"red"}} /> : <FavoriteBorderIcon sx={{color:"white"}}/>}
      </IconButton>
      <CardContent
        sx={{
          height: `${newHeight}`,
          transition:"all .4s",
          overflow:"hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "relative",
          gap: ".2rem",
          zIndex: "1",
        }}
      >
        <Typography gutterBottom variant="h6" component="h2">
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: ".9rem" }} component={"h6"}>
          Speaker: {item.speakers}
        </Typography>
        <Typography sx={{ fontSize: ".8rem" }} component={"p"}>
          Asistente: {item.attendees}
        </Typography>
        <Typography variant="body2" component={"p"}>
          Fecha: {item.date}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding:"1rem"
        }}
      >
        <Button
          onClick={() => {
            handleHeight()
          }}
          variant="outlined"
          size="small"
          sx={{ borderRadius: ".9rem", color: "white" }}
        >
          Leer más
        </Button>
        <Button variant="contained" size="small" sx={{ borderRadius: ".9rem" }}>
          <Link to={`/workshop-detail/${item._id}`} style={{ textDecoration: "none", color: "white" }}>
            {item.status === "PENDIENTE" ? "Registrarse" : "Ver"}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

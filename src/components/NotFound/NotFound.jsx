import React from "react";
import { Button, Container, Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../animations/404-animation.json"; // Asegúrate de que la ruta sea correcta

const ErrorIcon = styled(Box)(({ theme }) => ({
  fontSize: "100px",
  color: theme.palette.error.main,
}));

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            height: "80vh", // Ajusta la altura a una cuarta parte de la ventana
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden", // Asegura que el contenido extra no se vea
          }}
        >
          <Player
            autoplay
            loop
            src={animationData}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Asegura que la animación cubra completamente el contenedor
            }}
          />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Oops! La página que buscas no existe.
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Parece que has seguido un enlace roto o has escrito mal la dirección.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to="/"
              sx={{
                borderRadius: "60px",
                backgroundColor: "red",
                color: "white",
                textTransform: "none",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "red",
                },
              }}
            >
              Volver al Inicio
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to="/workshops"
              sx={{
                borderRadius: "60px",
                backgroundColor: "red",
                color: "white",
                textTransform: "none",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "red",
                },
              }}
            >
              Ver Workshops
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              to="/events"
              sx={{
                borderRadius: "60px",
                backgroundColor: "red",
                color: "white",
                textTransform: "none",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "red",
                },
              }}
            >
              Ver Eventos
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;

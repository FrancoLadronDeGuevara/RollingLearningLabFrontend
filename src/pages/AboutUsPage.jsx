import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import AboutUsCard from "../components/AboutUsCard/AboutUsCard";

// Enlace a la imagen de fondo
const backgroundImageUrl =
  "https://cdn1.vectorstock.com/i/1000x1000/32/85/startup-programmers-team-work-flat-concept-vector-29033285.jpg";

const teamMembers = [
  {
    image: "https://i.imgur.com/lLAowC8.jpeg",
    title: "Javier Herrera",
    description:
      "Un estudiante de Programador universitario, apacionado del mundo de la programacion.",
    linkedin: "https://www.linkedin.com/in/carlos-herrera-341979307/",
    github: "https://github.com/Herra2113",
  },
  {
    image: "https://i.imgur.com/W8rxzqI.jpeg",
    title: "Fernando Arroyo",
    description:
      "Me considero una persona dinámica y activa, siempre en busca de nuevos desafíos y oportunidades para crecer tanto personal como profesionalmente. Poseo una gran pasión por el aprendizaje y una mentalidad abierta hacia el desarrollo continuo.",
    linkedin: " https://www.linkedin.com/in/fer3443in/",
    github: "https://github.com/fer3443",
  },
  {
    image: "https://i.imgur.com/1RYTo88.jpeg",
    title: "Sergio Zelaya",
    description: "Electronic engineer and programmer in progress.",
    linkedin: "https://www.linkedin.com/in/sergio-sebastian-zelaya-/",
    github: "https://github.com/SergioSZelaya",
  },
  {
    image: "https://i.imgur.com/KzpeuHz.jpeg",
    title: "Franco Guevara",
    description:
      "Desarrollador Full Stack MERN | MongoDB | ExpressJS | ReactJS | NodeJS",
    linkedin: "https://www.linkedin.com/in/franco-guevara/",
    github: "https://github.com/FrancoLadronDeGuevara",
  },
];

const AboutUsPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Container>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="h6" paragraph align="center">
            Conoce a nuestro equipo.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <AboutUsCard
                  image={member.image}
                  title={member.title}
                  description={member.description}
                  linkedin={member.linkedin}
                  github={member.github}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage;

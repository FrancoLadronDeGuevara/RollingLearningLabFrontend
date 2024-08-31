import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import AboutUsCard from "../components/AboutUsCard/AboutUsCard";

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
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        padding: "40px 0",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" paragraph>
          Conoce a nuestro equipo.
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
  );
};

export default AboutUsPage;

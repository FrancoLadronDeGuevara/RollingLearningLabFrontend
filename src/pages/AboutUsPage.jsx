import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import AboutUsCard from "../components/AboutUsCard/AboutUsCard";

const teamMembers = [
  {
    image: "https://i.imgur.com/TD4K",
    title: "Carlos Javier Herrera",
    description: "Descripción sobre ti.",
    linkedin: "https://www.linkedin.com/in/tu-perfil",
    github: "https://github.com/tu-usuario",
  },
  // Añade más miembros según sea necesario
];

const AboutUsPage = () => {
  return (
    <Container sx={{ marginTop: "40px" }}>
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
  );
};

export default AboutUsPage;

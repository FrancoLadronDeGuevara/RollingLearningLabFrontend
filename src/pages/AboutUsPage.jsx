import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import AboutUsCard from "../components/AboutUsCard/AboutUsCard";

const teamMembers = [
  {
    image: "url/to/image1.jpg",
    title: "Member 1",
    description: "Description for member 1",
    linkedin: "https://www.linkedin.com/in/member1",
    github: "https://github.com/member1",
  },
  {
    image: "url/to/image2.jpg",
    title: "Member 2",
    description: "Description for member 2",
    linkedin: "https://www.linkedin.com/in/member2",
    github: "https://github.com/member2",
  },
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

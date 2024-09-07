import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { Email, WhatsApp, LinkedIn, GitHub } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 

export const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 3,
          mb: 4,
        }}
      >
        <Avatar
          alt="user profile image"
          src={user?.profileImage}
          sx={{
            width: { xs: 140, md: 200 },
            height: { xs: 140, md: 200 },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            gap: 1,
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2,
            }}
          >
            {user?.username || "Nombre de usuario"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.bio || "Puede agregar una breve descripción"}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            {user?.email && (
              <IconButton
                component="a"
                href={`mailto:${user.email}`}
                aria-label="email"
              >
                <Email />
                <Typography sx={{ ml: 1 }}>Email: {user.email}</Typography>
              </IconButton>
            )}
            {user?.whatsapp && (
              <IconButton
                component="a"
                href={`https://wa.me/${user.whatsapp}`}
                aria-label="whatsapp"
              >
                <WhatsApp />
                <Typography sx={{ ml: 1 }}>
                  WhatsApp: {user.whatsapp}
                </Typography>
              </IconButton>
            )}
            {user?.linkedin && (
              <IconButton
                component="a"
                href={user.linkedin}
                aria-label="linkedin"
              >
                <LinkedIn />
                <Typography sx={{ ml: 1 }}>LinkedIn</Typography>
              </IconButton>
            )}
            {user?.github && (
              <IconButton component="a" href={user.github} aria-label="github">
                <GitHub />
                <Typography sx={{ ml: 1 }}>GitHub</Typography>
              </IconButton>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              onClick={() => navigate("/user/config")}
              variant="contained"
              sx={{
                my: 2,
                color: "#fff",
                fontSize: 14,
                backgroundColor: "#d81d26",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              {"Editar Perfil"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Workshops Asistidos
      </Typography>

      <Grid container spacing={3}>
        {/* Tarjetas de workshops */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt="Workshop Image"
              height="140"
              image="https://via.placeholder.com/140"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Título del Workshop 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Temas Vistos: Tema 1, Tema 2, Tema 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Institución: Nombre de la Institución
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt="Workshop Image"
              height="140"
              image="https://via.placeholder.com/140"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Título del Workshop 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Temas Vistos: Tema 1, Tema 2, Tema 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Institución: Nombre de la Institución
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserInfo;

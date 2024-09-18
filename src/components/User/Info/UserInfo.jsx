import {
  Box,
  Typography,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../../DefaultButton/DefaultButton";

export const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Grid container maxWidth="md" sx={{ mt: 4 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="user profile image"
            src={user?.profileImage}
            sx={{
              width: 300,
              height: 300,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#414141",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {user?.username || "Nombre de usuario"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              mt: 1,
            }}
          >
            <Email sx={{ mr: 1, color: "gray" }} />
            {user?.email && (
              <Typography variant="body2" sx={{ color: "gray" }}>
                {user.email}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: 100,
              p: 1,
              mt: 2,
              border: "1px solid lightgray",
              borderRadius: 1,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {user?.userDescription || "Sin descripción..."}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <DefaultButton
              className="default-button-reverse"
              buttonText="Editar perfil"
              onclick={() => navigate("/user/config")}
            />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Workshops Asistidos
      </Typography>

      <Grid container spacing={3}>
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
    </>
  );
};

export default UserInfo;

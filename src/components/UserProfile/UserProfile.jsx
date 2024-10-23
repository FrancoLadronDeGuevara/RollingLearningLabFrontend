import { Avatar, Box, Chip, Container, Grid, Typography } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../redux/actions/user.actions";
import WorkshopEventCard from "../WorkshopEventCard/WorkshopEventCard";
import Loader from "../Loader/Loader";
import { CompletedWorkshops } from "../User/UserWorkshops/CompletedWorkshops/CompletedWorkshops";
import { CreatedWorkshops } from "../User/UserWorkshops/CreatedWorkshops/CreatedWorkshops";
import { RegisteredWorkshops } from "../User/UserWorkshops/RegisteredWorkshops/RegisteredWorkshops";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, loading } = useSelector((state) => state.user);
  const { favoriteWorkshops, favoriteEvents } = useSelector(
    (state) => state.favorite
  );

  useEffect(() => {
    dispatch(getUserById(id));
  }, [favoriteWorkshops, favoriteEvents]);

  return (
    <>
      {loading && <Loader />}
      <Grid container maxWidth="lg" sx={{ mt: 4, mx: "auto" }}>
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
            src={selectedUser?.profileImage}
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
            {selectedUser?.username || "Nombre de usuario"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "left" },
              mt: 1,
            }}
          >
            {selectedUser?.role === "admin" ? (
              <Chip label="Administrador" color="error" sx={{ width: 100 }} />
            ) : selectedUser?.role === "speaker" ? (
              <Chip label="Speaker" color="warning" sx={{ width: 100 }} />
            ) : (
              <Chip label="Usuario" color="primary" sx={{ width: 100 }} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              mt: 1,
            }}
          >
            <Email sx={{ mr: 1, color: "gray" }} />
            {selectedUser?.email && (
              <Typography variant="body2" sx={{ color: "gray" }}>
                {selectedUser.email}
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
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {selectedUser?.userDescription || "Sin descripción..."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Container disableGutters maxWidth="lg" sx={{ mt: 4 }}>
        <CompletedWorkshops selectedUser={selectedUser} />
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#414141",
              textAlign: "center",
              my: 2,
            }}
          >
            Favoritos
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 2,
              m: 1,
              border: "1px solid lightgray",
              borderRadius: 1,
              p: 1,
              minHeight: 250,
              backgroundColor: "#f2f2f2",
            }}
          >
            {selectedUser?.favoriteWorkshops?.length > 0 ||
            selectedUser?.favoriteEvents?.length > 0 ? (
              <>
                {selectedUser?.favoriteEvents?.map((event) => (
                  <WorkshopEventCard
                    key={event._id}
                    {...event}
                    isWorkshop={false}
                  />
                ))}
                {selectedUser?.favoriteWorkshops?.map((workshop) => (
                  <WorkshopEventCard
                    key={workshop._id}
                    {...workshop}
                    isWorkshop
                  />
                ))}
              </>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "gray",
                  mt: 2,
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                El usuario no tiene favoritos
              </Typography>
            )}
          </Box>
        </Box>
        <CreatedWorkshops selectedUser={selectedUser} />
        <RegisteredWorkshops selectedUser={selectedUser} />
      </Container>
    </>
  );
};

export default UserProfile;

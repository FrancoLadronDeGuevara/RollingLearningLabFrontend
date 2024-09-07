import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../../../redux/actions/user.actions";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import { getUserComments } from "../../../../redux/actions/comment.actions";

export const DetailsUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { userComments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getUserComments(id));
  }, []);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          alt="user profile image"
          src={selectedUser?.profileImage}
          sx={{ width: 200, height: 200 }}
        />
        <Box>
          <Typography variant="h4" textAlign="center">
            {selectedUser?.username}
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ my: 2 }}>
            {selectedUser?.email}
          </Typography>
          <Box display="flex" justifyContent="center">
            {selectedUser?.role === "admin" ? (
              <Chip label="ADMINISTRADOR" color="error" />
            ) : selectedUser?.role === "user" ? (
              <Chip label="USUARIO" color="primary" />
            ) : (
              <Chip label="SPEAKER" color="warning" />
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          my: 3,
        }}
      >
        <Box>
          <Typography variant="h4" textAlign="left" sx={{ my: 2 }}>
            Workshops creados:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {selectedUser?.createdWorkshops?.length > 0 ? (
              selectedUser?.createdWorkshops?.map((workshop, index) => (
                <FavoritesCard key={index} item={workshop} />
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
                {selectedUser?.username} no ha creado un workshop todavía
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          my: 3,
        }}
      >
        <Box>
          <Typography variant="h4" textAlign="left" sx={{ my: 2 }}>
            Workshops registrados:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {selectedUser?.registeredWorkshops?.length > 0 ? (
              selectedUser?.registeredWorkshops?.map((workshop, index) => (
                <FavoritesCard key={index} item={workshop} />
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
                {selectedUser?.username} no se ha registrado a workshops todavía
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box>
          <Typography variant="h4" textAlign="left" sx={{ my: 2 }}>
            Workshops favoritos:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {selectedUser?.favoriteWorkshops?.length > 0 ? (
              selectedUser?.favoriteWorkshops?.map((workshop, index) => (
                <FavoritesCard key={index} item={workshop} />
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
                {selectedUser?.username} no tiene workshops favoritos
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          my: 3,
        }}
      >
        <Box>
          <Typography variant="h4" textAlign="left" sx={{ my: 2 }}>
            Eventos favoritos:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {selectedUser?.favoriteEvents?.length > 0 ? (
              selectedUser?.favoriteEvents?.map((event, index) => (
                <FavoritesCard key={index} item={event} />
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
                {selectedUser?.username} no tiene eventos favoritos
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          border: "1px solid #ccc",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box>
          <Typography variant="h4" textAlign="left" sx={{ my: 2 }}>
            Ultimos comentarios:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {userComments.length > 0 ? (
              userComments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    px: 1,
                    borderRadius: 1,
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography variant="body2" sx={{ my: 2 }}>
                    {selectedUser?.username} ha comentado en {" "}
                    {comment.workshop ? "el workshop " : "el evento "}
                    <Link
                      to={
                        comment.workshop
                          ? `/workshop/${comment.workshop._id}`
                          : `/event/${comment.event._id}`
                      }
                    >
                      {comment.workshop ? comment.workshop.title : comment.event.title}{" "}
                    </Link>
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="h6" textAlign="center" sx={{ my: 2 }}>
                {selectedUser?.username} todavía no tiene comentarios
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

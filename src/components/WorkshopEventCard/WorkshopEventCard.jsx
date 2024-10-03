import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { formatDate } from "../../helpers/formatDate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../hooks/useAlert";
import {
  addEventFavorite,
  addFavoriteWorkshop,
  removeEventFavorite,
  removeFavoriteWorkshop,
} from "../../redux/actions/favorite.actions";

const WorkshopEventCard = ({
  _id,
  title,
  description,
  date,
  startTime,
  imageBanner,
  isWorkshop,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { favoriteWorkshops, favoriteEvents } = useSelector(
    (state) => state.favorite
  );
  const { autoCloseAlert } = useSweetAlert();

  const isWorkshopFavorite = favoriteWorkshops.some((fav) => fav._id === _id);

  const isEventFavorite = favoriteEvents.some((fav) => fav._id === _id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: isWorkshop
            ? `https://localhost:5173/workshop/${_id}`
            : `https://localhost:5173/event/${_id}`,
        })
        .then(() => autoCloseAlert("Compartido exitosamente", "success"))
        .catch((error) =>
          autoCloseAlert("Error al compartir: " + error, "error")
        );
    } else {
      autoCloseAlert("Tu navegador no soporta compartir", "error");
    }
  };

  const handleFavorite = () => {
    if (isAuthenticated) {
      if (isWorkshop) {
        isWorkshopFavorite
          ? dispatch(removeFavoriteWorkshop({ workshopId: _id })).then(() => {
              autoCloseAlert("Eliminado de favoritos", "success");
            })
          : dispatch(addFavoriteWorkshop({ workshopId: _id })).then(() => {
              autoCloseAlert("Agregado a favoritos", "success");
            });
      } else {
        isEventFavorite
          ? dispatch(removeEventFavorite({ eventId: _id })).then(() => {
              autoCloseAlert("Eliminado de favoritos", "success");
            })
          : dispatch(addEventFavorite({ eventId: _id })).then(() => {
              autoCloseAlert("Agregado a favoritos", "success");
            });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Grid
      container
      component={Paper}
      elevation={5}
      sx={{ width: { xs: 230, sm: 430 }, borderRadius: 0 }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          backgroundImage: `url(${imageBanner})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: 205,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            p: 1,
            background:
              "linear-gradient(360deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 80%)",
          }}
        >
          <Chip
            size="small"
            label={isWorkshop ? "Workshop" : "Evento"}
            sx={{
              position: "absolute",
              bottom: 35,
              left: 10,
              backgroundColor: isWorkshop ? "#26A69A" : "#FBC02D",
              color: "#f5f5f5",
              fontSize: 10,
            }}
          />
          <Typography
            variant="body1"
            sx={{ color: "white", bottom: 10, left: 12, position: "absolute" }}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip label={formatDate(date)} sx={{ fontSize: 10 }} />
          <Chip label={`${startTime} hs`} sx={{ fontSize: 10 }} />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ height: 80 }}>
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              textAlign: "justify",
              height: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            sx={{ color: "white", backgroundColor: "#d81d26", ":hover": {color: "#414141"} }}
            label="Ver más"
            onClick={() =>
              navigate(isWorkshop ? `/workshop/${_id}` : `/event/${_id}`)
            }
          />
          <Box>
            <IconButton onClick={handleFavorite}>
              {isWorkshop ? (
                isWorkshopFavorite ? (
                  <FavoriteOutlinedIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )
              ) : isEventFavorite ? (
                <FavoriteOutlinedIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WorkshopEventCard;

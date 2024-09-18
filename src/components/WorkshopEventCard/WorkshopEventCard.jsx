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
import DefaultButton from "../DefaultButton/DefaultButton";
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

  const isWorkshopFavorite = favoriteWorkshops.some((fav) => fav === _id);

  const isEventFavorite = favoriteEvents.some((fav) => fav === _id);

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
          })
      } else {
        isEventFavorite
          ? dispatch(removeEventFavorite({ eventId: _id })).then(() => {
            autoCloseAlert("Eliminado de favoritos", "success");
          })
          : dispatch(addEventFavorite({ eventId: _id })).then(() => {
            autoCloseAlert("Agregado a favoritos", "success");
          })
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Grid container component={Paper} sx={{ width: { xs: 300, md: 700 } }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${imageBanner})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: 300,
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
            label={isWorkshop ? "Nuevo Workshop" : "Nuevo Evento"}
            sx={{
              position: "absolute",
              bottom: 70,
              left: 10,
              backgroundColor: "#d81d26",
              color: "white",
            }}
          />
          <Typography
            variant="h5"
            sx={{ color: "white", bottom: 30, left: 12, position: "absolute" }}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Chip label={formatDate(date)} />
          <Chip label={`${startTime} hs`} />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ height: 140 }}>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              textAlign: "justify",
              height: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DefaultButton
            className="default-button-reverse"
            buttonText="Ver más"
            onclick={
              isWorkshop
                ? () => navigate(`/workshop/${_id}`)
                : () => navigate(`/event/${_id}`)
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

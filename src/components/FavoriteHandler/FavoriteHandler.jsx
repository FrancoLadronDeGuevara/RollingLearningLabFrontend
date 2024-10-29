import { IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import useSweetAlert from '../../hooks/useAlert';
import { useDispatch, useSelector } from 'react-redux';
import { addEventFavorite, addFavoriteWorkshop, removeEventFavorite, removeFavoriteWorkshop } from '../../redux/actions/favorite.actions';

export const FavoriteHandler = ({id, isAuthenticated, isWorkshop}) => {
  const { autoCloseAlert } = useSweetAlert();
  const dispatch = useDispatch()
  const { favoriteWorkshops, favoriteEvents} = useSelector((state) => state.favorite)
  const isWorkshopFavorite = favoriteWorkshops.some((fav) => fav._id === id);
  const isEventFavorite = favoriteEvents.some((fav) => fav._id === id);

	const handleFavorite = () => {
    if (isAuthenticated) {
      if (isWorkshop) {
        isWorkshopFavorite
          ? dispatch(removeFavoriteWorkshop({ workshopId:id })).then(() => {
              autoCloseAlert("Eliminado de favoritos", "success");
            })
          : dispatch(addFavoriteWorkshop({ workshopId:id })).then(() => {
              autoCloseAlert("Agregado a favoritos", "success");
            });
      } else {
        isEventFavorite
          ? dispatch(removeEventFavorite({ eventId:id })).then(() => {
              autoCloseAlert("Eliminado de favoritos", "success");
            })
          : dispatch(addEventFavorite({ eventId:id })).then(() => {
              autoCloseAlert("Agregado a favoritos", "success");
            });
      }
    } else {
      navigate("/login");
    }
  };
  return (
		<IconButton onClick={handleFavorite} sx={{background:"#3D3D3D"}}>
		{isWorkshop ? (
			isWorkshopFavorite ? (
				<FavoriteOutlinedIcon sx={{ color: "red" }} />
			) : (
				<FavoriteBorderOutlinedIcon sx={{color:"white"}}/>
			)
		) : isEventFavorite ? (
			<FavoriteOutlinedIcon sx={{ color: "red" }} />
		) : (
			<FavoriteBorderOutlinedIcon sx={{color:"white"}}/>
		)}
	</IconButton>
  )
}

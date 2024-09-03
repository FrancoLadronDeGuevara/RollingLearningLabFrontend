import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/actions/user.actions";
export const ButtonFavorite = ({ FavId }) => {
  const { user } = useSelector((state) => state.user);
  const { _id } = user;
  const dispatch = useDispatch();
  const editedData = { _id, favoriteWorkshops: FavId };
  const [isFav, setIsFav] = useState(false);
  const handleFav = () => {
    dispatch(editUser(editedData));
    setIsFav(!isFav);
  };
  return (
    <IconButton
      title="Add favorite"
      sx={{ width: "2rem" }}
      onClick={() => handleFav()}
    >
      {isFav ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "#111" }} />
      )}
    </IconButton>
  );
};

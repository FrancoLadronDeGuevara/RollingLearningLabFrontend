import { Box, Typography } from "@mui/material";
import WorkshopEventCard from "../../../WorkshopEventCard/WorkshopEventCard";
import { useSelector } from "react-redux";

export const FavoritesEvents = () => {
  const { favoriteEvents } = useSelector((state) => state.favorite);
  return (
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
        Eventos Favoritos
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
        {favoriteEvents?.length > 0 ? (
          favoriteEvents?.map((workshop) => (
            <WorkshopEventCard key={workshop._id} {...workshop} />
          ))
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
            El usuario no tiene workshops favoritos
          </Typography>
        )}
      </Box>
    </Box>
  );
};

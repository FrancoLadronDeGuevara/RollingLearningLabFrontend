import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import WorkshopEventCard from "../../../WorkshopEventCard/WorkshopEventCard";

export const CreatedWorkshops = ({ selectedUser }) => {
  const { user } = useSelector((state) => state.user);

  if (!selectedUser) {
    selectedUser = user;
  }

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
        Workshops Creados
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
        {selectedUser?.createdWorkshops?.length > 0 ? (
          selectedUser?.createdWorkshops?.map((workshop) => (
            <WorkshopEventCard key={workshop._id} {...workshop} isWorkshop />
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
            El usuario no ha creado workshops
          </Typography>
        )}
      </Box>
    </Box>
  );
};

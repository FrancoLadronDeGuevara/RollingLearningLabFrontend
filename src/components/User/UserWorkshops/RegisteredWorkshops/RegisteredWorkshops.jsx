import { Box, Typography } from "@mui/material";
import WorkshopEventCard from "../../../WorkshopEventCard/WorkshopEventCard";
import { useSelector } from "react-redux";

export const RegisteredWorkshops = ({ selectedUser }) => {
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
        Workshops Registrados
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-around",
          m: 1,
          gap: 2,
          border: "1px solid lightgray",
          borderRadius: 1,
          p: 1,
          minHeight: 250,
          backgroundColor: "#f2f2f2",
        }}
      >
        {selectedUser?.registeredWorkshops?.length > 0 ? (
          selectedUser?.registeredWorkshops?.map((workshop) => (
            <WorkshopEventCard key={workshop._id} {...workshop} isWorkshop/>
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
            El usuario todavía no ha asistido a ningún workshop
          </Typography>
        )}
      </Box>
    </Box>
  );
};

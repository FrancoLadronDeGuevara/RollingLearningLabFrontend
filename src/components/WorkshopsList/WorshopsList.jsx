import { Grid, Typography } from "@mui/material";
import { Banner } from "../Banner/Banner";
import bannertestRL from "../../assets/images/bannertestRL.jpg";
import { useSelector } from "react-redux";
import WorkshopEventCard from "../WorkshopEventCard/WorkshopEventCard";
export const WorkshopsList = () => {
  const { workshops } = useSelector((state) => state.workshop);
  return (
    <Grid container spacing={2} sx={{ mb: 2}}>
      <Grid item xs={12}>
        <Banner image={bannertestRL} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Workshops
        </Typography>
      </Grid>
      {workshops.map(
        (workshop) =>
          workshop.active && (
            <Grid item xs={12} key={workshop._id} sx={{ display: "flex", justifyContent: "center" }}>
              <WorkshopEventCard {...workshop} isWorkshop />
            </Grid>
          )
      )}
    </Grid>
  );
};

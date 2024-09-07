import { Grid, Typography } from "@mui/material";
import { Banner } from "../Banner/Banner";
import { CardWorkshop } from "../Workshop/Cardworkshop/CardWorkshop";
import bannertestRL from "../../assets/images/bannertestRL.jpg";
import { useSelector } from "react-redux";
export const Worshops = () => {
  const { workshops } = useSelector((state) => state.workshop);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Banner image={bannertestRL} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Workshops
        </Typography>
      </Grid>
      {workshops.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index} sx={{paddingBlock:"1rem"}}>
          <CardWorkshop item={item} key={index} />
        </Grid>
      ))}
    </Grid>
  );
};

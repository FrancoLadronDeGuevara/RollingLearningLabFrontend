import { Grid } from "@mui/material";

export const Banner = ({ image }) => {
  return (
    <Grid container sx={{ height:'50vh', placeItems:'center', overflow:'hidden'}}>
      <Grid item xs={12}>
        <img src={image} alt="nombre de imagen" />
      </Grid>
    </Grid>
  );
};
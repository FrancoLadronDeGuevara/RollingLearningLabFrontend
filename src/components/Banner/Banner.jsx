import { Grid } from "@mui/material";

export const Banner = ({ image }) => {
  return (
    <Grid container sx={{margin:'1rem 0', height:'30vh', placeItems:'center', overflow:'hidden'}}>
      <Grid item xs={12}>
        <img src={image} alt="nombre de imagen" />
      </Grid>
    </Grid>
  );
};
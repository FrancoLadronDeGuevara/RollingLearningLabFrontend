import { Grid, Typography } from "@mui/material";
import { Banner } from "../Banner/Banner";
import { CardWorkshop } from "../Workshop/Cardworkshop/CardWorkshop";
import bannertestRL from "../../assets/images/bannertestRL.jpg";
import { CardDesktop } from "./CardworkshopDesktop/CardDesktop";

const dataWorkshop = [
  {
    id:1,
    speaker:"Pepe",
    imagen: "src/assets/images/bannertestRL.jpg",
    title: "Titulo de prueba",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    id:2,
    speaker:"Pepe",
    imagen: "src/assets/images/bannertestRL.jpg",
    title: "Titulo de prueba",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    id:3,
    speaker:"Pepe",
    imagen: "src/assets/images/bannertestRL.jpg",
    title: "Titulo de prueba",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
];

export const Worshops = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Banner image={bannertestRL} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Workshops
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
        <CardWorkshop data={dataWorkshop} />
      </Grid>
      <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
        <CardDesktop data={dataWorkshop} />
      </Grid>
    </Grid>
  );
};
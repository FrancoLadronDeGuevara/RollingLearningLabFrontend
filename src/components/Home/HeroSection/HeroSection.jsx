import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { BannerHome } from "./Banner/BannerHome";
import {ButtonCall} from "../ButtonCTA/ButtonCall";

const HeroSection = () => {
  return (
   <>
    <Container
      maxWidth="lg"
      sx={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "1rem",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          component="h2"
          sx={{
            color:"#333333",
            fontSize: { xs: "2.3rem", md: "2.5rem", lg:"3.5rem" },
            fontWeight: "500",
            maxWidth: { sm: "80%", lg:"90%" },
            letterSpacing:{xs:"-0.1rem", md:"initial"},
            lineHeight:{xs:"2.3rem", md:"initial"}
          }}
        >
        Descubre y participa en los próximos eventos y workshops de RollingCode School. Mantente al día con nuestras actividades y sigue aprendiendo junto a la comunidad.
        </Typography>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typography sx={{maxWidth:{xs:"70%",sm:"80%", lg:"40%"}, fontWeight:"500", fontSize:{xs:"1.1rem", md:"1.3rem"}}} component="h2">
          Te perdiste o se te paso alguno? No te preocupes aqui podes encontrarlos. ¡Explora nuevas oportunidades para crecer como desarrollador!
        </Typography>
      </motion.div>
      <ButtonCall textButton={"Registrarse"}/>
    </Container>
    <BannerHome/>
   </>
  );
};

export default HeroSection;

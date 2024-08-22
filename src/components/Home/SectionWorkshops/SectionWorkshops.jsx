import { Container, Typography } from "@mui/material";
import { ButtonCall } from "../ButtonCTA/ButtonCall";
import { motion } from "framer-motion";

export const SectionWorkshops = () => {
  const stylesText = {
    color: "#444444",
    fontWeight: "600",
    fontSize: { xs: "2.1rem", md: "2.3rem" },
    letterSpacing: { xs: "-0.1rem", md: "initial" },
    lineHeight: { xs: "2.3rem", md: "initial" },
    padding: "1rem 0",
    textAlign: "center",
    width: { xs: "100%", md: "70%" },
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "1rem",
        margin: "1rem 0",
        display: "grid",
        placeItems: "center",
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ transition: 0.6 }}
      >
        <Typography component="h3" sx={stylesText}>
          Enterate cuales serán los proximos Workshops en RollingCode. Se te
          pasó alguno? Miralos aquí.
        </Typography>
      </motion.div>
      <ButtonCall textButton={"Ver más"} />
    </Container>
  );
};

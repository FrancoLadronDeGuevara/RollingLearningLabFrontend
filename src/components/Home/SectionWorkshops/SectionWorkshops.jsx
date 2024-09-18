import { Box, Container, Typography } from "@mui/material";
import { ButtonCall } from "../ButtonCTA/ButtonCall";
import { motion } from "framer-motion";
import { CarrouselWorkshop } from "./CarrouselViewWorkshops/CarrouselWorkshop";
import { dataTest } from "../../../mocks/dataTest";
import { useSelector } from "react-redux";
import WorkshopEventCard from "../../WorkshopEventCard/WorkshopEventCard";

export const SectionWorkshops = () => {
  const { workshops } = useSelector((state) => state.workshop);

  const stylesText = {
    color: "#444444",
    fontWeight: "600",
    fontSize: { xs: "1.9rem", md: "2.3rem" },
    letterSpacing: { xs: "-0.1rem", md: "initial" },
    lineHeight: { xs: "2.3rem", md: "initial" },
    margin: "1rem auto",
    padding: "0 1rem",
    textAlign: "center",
    width: { xs: "100%", md: "60%" },
    maxWidth: { xs: "xs" },
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "grid",
          height: "auto",
          padding: "1.5rem 0",
          placeItems: "center",
          marginBlock: "1rem",
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ transition: 0.6 }}
        >
          <Typography component="h3" sx={stylesText}>
            Enterate cuales serán los proximos Workshops en RollingCode.
            <br /> Se te pasó alguno? Miralos aquí.
          </Typography>
        </motion.div>
        <CarrouselWorkshop data={dataTest} />
        <ButtonCall textButton={"Ver más"} linkTo={"/workshops"} />
        <Box>
          <Typography>Ultimos workshops</Typography>
          {workshops.map(
            (workshop) =>
              workshop.active && (
                <WorkshopEventCard key={workshop._id} {...workshop} isWorkshop />
              )
          )}
        </Box>
      </Container>
    </>
  );
};

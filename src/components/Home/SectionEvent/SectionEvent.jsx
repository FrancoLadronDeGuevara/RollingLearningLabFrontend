import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { CarrouselWorkshop } from "../SectionWorkshops/CarrouselViewWorkshops/CarrouselWorkshop";
import {dataTest} from '../../../mocks/dataTest'
import { ButtonCall } from "../ButtonCTA/ButtonCall";
import { useSelector } from "react-redux";
import WorkshopEventCard from "../../WorkshopEventCard/WorkshopEventCard";

export const SectionEvent = () => {
  const {events } = useSelector((state) => state.event);

  const stylesText = {
    color: "#444444",
    fontWeight: "600",
    fontSize: { xs: "2.1rem", md: "2.3rem" },
    letterSpacing: { xs: "-0.1rem", md: "initial" },
    lineHeight: { xs: "2.3rem", md: "initial" },
    margin: "1rem auto",
    textAlign: "center",
    width: { xs: "100%", md: "60%" },
  };
  return (
    <Container maxWidth="lg" sx={{
      display: "grid",
      height: "auto",
      padding: "1.5rem 0",
      placeItems: "center",
      marginBlock: "1rem",
    }}>
      <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ transition: 0.6 }}
        >
          <Typography component="h3" sx={stylesText}>
            Próximos eventos en RollingCode
          </Typography>
        </motion.div>
        <CarrouselWorkshop data={dataTest} />
        <ButtonCall textButton={"ver más"}/>
        <Box>
          <Typography>Ultimos workshops</Typography>
          {events.map(
            (event) =>
              event.active && (
                <WorkshopEventCard key={event._id} {...event} isWorkshop={false} />
              )
          )}
        </Box>
    </Container>
  );
};

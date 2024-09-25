import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getWorkshop } from "../../redux/actions/workshop.actions";
import Loader from "../../components/Loader/Loader";
import CommentSection from "../CommentSection/CommentSection";

const WorkshopDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { workshop, loading } = useSelector((state) => state.workshop);
  useEffect(() => {
    dispatch(getWorkshop(id));
  }, []);

  

  return (
    <>
      {loading && <Loader />}
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: "1rem",
            marginBlock: "1.5rem",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h4" component={"h2"}>
              {workshop?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
                inscribirse
              </Button>
            </Box>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={workshop?.imageBanner}
                alt={workshop?.title}
              />
            </Card>
            {workshop?.status === "COMPLETADO" ? (
              <Typography>
                <span style={{ fontWeight: "bolder" }}>Emitido: </span>
                {workshop?.date}
              </Typography>
            ) : (
              <>
                <Typography>
                  {" "}
                  <span style={{ fontWeight: "bolder" }}>
                    Se emitirá:{" "}
                  </span>{" "}
                  {workshop?.date}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bolder" }}>
                    Comienzo a horas:
                  </span>{" "}
                  {workshop?.startTime}
                </Typography>
              </>
            )}
            {workshop?.speakers && (
              <Box>
                <Typography variant="body1" component="p">
                  <span style={{ fontWeight: "bolder" }}>Speaker:</span>{" "}
                  {workshop?.speakers.join(", ")}
                </Typography>
                {workshop?.attendees > 0 && (
                  <Typography variant="body2">
                    <span style={{ fontWeight: "bolder" }}>Asistentes:</span>{" "}
                    {workshop?.attendees.join(", ")}
                  </Typography>
                )}
              </Box>
            )}
            <Typography variant="body1" component="p">
              {workshop?.description}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CommentSection isWorkshop />
      </Container>
    </>
  );
};

export default WorkshopDetail;

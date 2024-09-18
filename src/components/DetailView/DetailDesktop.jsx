import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareIcon from "@mui/icons-material/Share";
import CommentSection from "../CommentSection/CommentSection";
import { formatedDate } from "../../utils/formatDate";

export const DetailDesktop = ({ workshop, pathname }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "70vh",
          marginBlock: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          alignItems:"center",
          gap: "1.5rem",
        }}
      >
        <Box sx={{ gridColumn: "span 5" }}>
          <Card>
            <CardMedia
              component="img"
              width="auto"
              image={workshop?.imageBanner}
              alt={workshop?.title}
            />
          </Card>
        </Box>
        <Box
          sx={{
            gridColumn: "span 7",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: ".5rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography color="#999">
              {pathname.includes("workshop") ? "Workshop" : "Evento"}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography color="#999">
              {workshop?.status === "PENDIENTE"
                ? workshop?.startTime
                : "Finalizado"}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography color="#999">{formatedDate(workshop?.date)}</Typography>
          </Box>
          <Typography variant="h3" component="h2" color="#333">
            {workshop?.title}
          </Typography>
          <Typography variant="body2" component="p" color="#333">
            {workshop?.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography variant="subtitle2" component="h3" color="#333">
              Speaker:
            </Typography>
            {workshop?.speakers.map((speak, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                component="h3"
                color="#333"
                fontWeight="bold"
              >
                {speak}
              </Typography>
            ))}
            <Divider orientation="vertical" variant="middle" flexItem />
            {workshop?.attendees.length > 0 && (
              <Typography variant="subtitle2" component="h3" color="#333">
                Asistente/s:
              </Typography>
            )}
            {workshop?.attendees.length > 0 &&
              workshop?.attendees.map((attend, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                  component="h3"
                  color="#333"
                  fontWeight="bold"
                >
                  {attend}
                </Typography>
              ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="text"
              sx={{ alignSelf: "flex-start", padding: "0" }}
            >
              inscribirse
            </Button>
            <Box>
              <IconButton onClick={"handleFavorite"}>
                <FavoriteOutlinedIcon sx={{ color: "red" }} />
              </IconButton>
              <IconButton onClick={"handleShare"}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <CommentSection isWorkshop />
    </Container>
  );
};

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const CardDesktop = ({ data }) => {
  const color = grey[100];
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "1.5rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        overflow: "hidden",
      }}
    >
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            sx={{
              width: "100%",
              height: "15rem",
              display: "flex",
              borderRadius: "0.4rem",
              overflow: "hidden",
            }}
          >
            <CardMedia
              image={item.imagen}
              sx={{ width: {sm:"60%", md:"45%"}, overflow: "hidden" }}
            />
            <CardContent
              sx={{
                padding: "1.5rem",
                background: color,
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                by: {item.speaker}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {item.description}
              </Typography>
              <Divider orientation="horizontal" variant="fullWidth" flexItem />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AvatarGroup total={20}>
                  <Avatar alt="Remy Sharp" src={item.imagen} />
                  <Avatar alt="Remy Sharp" src={item.imagen} />
                  <Avatar alt="Remy Sharp" src={item.imagen} />
                </AvatarGroup>
                <CardActions sx={{ display: "flex", gap: "1rem" }}>
                  <Button size="small" sx={{ textDecoration: "none" }}>
                    <Link to={`#`} style={{textDecoration:"none"}}>Leer más</Link>
                  </Button>
                  <Button variant="contained" size="small">
                    Registrarse
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Container>
  );
};

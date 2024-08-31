import React, { useState } from "react";
import {
  CardMedia,
  Typography,
  Box,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  CardContent,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../animations/Pofile-Animation.json";

const AboutUsCard = ({ image, title, description, linkedin, github }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ textAlign: "center", margin: "16px" }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          margin: "16px auto",
          cursor: "pointer",
          objectFit: "cover",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={handleOpen}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "400px",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              overflow: "hidden",
            }}
          >
            <Player
              autoplay
              loop
              src={animationData}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                bgcolor: "rgba(0, 0, 0, 0.6)",
                p: 2,
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h5" component="div" color="white">
                  {title}
                </Typography>
                <Typography variant="body2" color="white">
                  {description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  {linkedin && (
                    <IconButton
                      aria-label="linkedin"
                      component="a"
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "white" }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  )}
                  {github && (
                    <IconButton
                      aria-label="github"
                      component="a"
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "white" }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AboutUsCard;

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Modal,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Add, Email, WhatsApp, LinkedIn, GitHub } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import useImageHandler from "../../../../hooks/useImageHandler";
import { avatars as avatarOptions } from "../../../../helpers/userAvatars";
import { updateUserInfo } from "../../../../redux/actions/user.actions";

export const UserConfig = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setPreviewImage } = useImageHandler();

  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: user?.username || "",
    bio: user?.bio || "",
    email: user?.email || "",
    whatsapp: user?.whatsapp || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
  });

  const handleOpenAvatarModal = () => setOpenAvatarModal(true);
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);

  const handleAvatarChange = (avatar) => {
    setPreviewImage(avatar);
    dispatch(
      updateUserInfo({
        ...user,
        profileImage: avatar,
      })
    );
    handleCloseAvatarModal();
  };

  const handleFieldChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    dispatch(
      updateUserInfo({
        ...user,
        username: formValues.name,
        bio: formValues.bio,
        email: formValues.email,
        whatsapp: formValues.whatsapp,
        linkedin: formValues.linkedin,
        github: formValues.github,
      })
    );
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 4,
          mb: 4,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: 150, md: 300 },
            height: { xs: 150, md: 300 },
          }}
        >
          <Avatar
            alt="user profile image"
            src={user?.profileImage}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
          <IconButton
            onClick={handleOpenAvatarModal}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "50%",
              width: 40,
              height: 40,
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            gap: 4,
            flex: 1,
          }}
        >
          <TextField
            name="name"
            label="Nombre de usuario"
            value={formValues.name}
            onChange={handleFieldChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            name="bio"
            label="Descripción"
            value={formValues.bio}
            onChange={handleFieldChange}
            variant="outlined"
            size="small"
            multiline
            rows={2}
            fullWidth
          />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Redes Sociales
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                value={formValues.email}
                onChange={handleFieldChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="whatsapp"
                label="WhatsApp"
                value={formValues.whatsapp}
                onChange={handleFieldChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <WhatsApp sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="linkedin"
                label="LinkedIn"
                value={formValues.linkedin}
                onChange={handleFieldChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <LinkedIn sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="github"
                label="GitHub"
                value={formValues.github}
                onChange={handleFieldChange}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: <GitHub sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSaveChanges}
              sx={{
                my: 2,
                color: "#fff",
                fontSize: 14,
                backgroundColor: "#d81d26",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              {"Guardar cambios"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Modal open={openAvatarModal} onClose={handleCloseAvatarModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {avatarOptions.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar}
              sx={{ width: 70, height: 70, cursor: "pointer" }}
              onClick={() => handleAvatarChange(avatar)}
            />
          ))}
        </Box>
      </Modal>
    </Container>
  );
};

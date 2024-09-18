import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
} from "@mui/material";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import { useSelector, useDispatch } from "react-redux";
import useImageHandler from "../../../../hooks/useImageHandler";
import { avatars } from "../../../../helpers/userAvatars";
import { updateUserInfo } from "../../../../redux/actions/user.actions";
import { VisuallyHiddenInput } from "../../../../helpers/styles";
import ValidatedTextField from "../../../ValidatedTextField/ValidatedTextField";
import useInputValidation from "../../../../hooks/useInputValidation";
import {
  passwordRegex,
  userDescriptionRegex,
  usernameRegex,
} from "../../../../helpers/regularExpressions";
import ShowOrHidePassword from "../../../ShowOrHidePassword/ShowOrHidePassword";
import useSweetAlert from "../../../../hooks/useAlert";
import Loader from "../../../Loader/Loader";

export const UserConfig = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { previewImage, handleReadImage, handleUploadImage, clearPreview } =
    useImageHandler();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [
    description,
    descriptionError,
    handleDescriptionChange,
    resetDescription,
    setDescription,
  ] = useInputValidation(userDescriptionRegex);
  const [
    username,
    usernameError,
    handleUsernameChange,
    resetUsername,
    setUsername,
  ] = useInputValidation(usernameRegex);
  const [
    oldPassword,
    oldPasswordError,
    handleOldPasswordChange,
    resetOldPassword,
  ] = useInputValidation(passwordRegex);
  const [
    newPassword,
    newPasswordError,
    handleNewPasswordChange,
    resetNewPassword,
  ] = useInputValidation(passwordRegex);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert } = useSweetAlert();

  useEffect(() => {
    if (user) {
      setDescription(user?.userDescription);
      setUsername(user?.username);
      setCurrentImageUrl(user?.profileImage);
    }
  }, [user]);

  const handleAvatarChange = (avatar) => {
    setCurrentImageUrl(avatar);
    clearPreview();
    setUploadedImage(null);
  };

  const handleErrorConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
    setConfirmNewPasswordError(newPassword !== e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      autoCloseAlert(
        "Por favor, rellena el formulario correctamente",
        "warning"
      );
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(true);
      setIsLoading(false);
      return;
    }

    if (
      usernameError ||
      descriptionError ||
      newPasswordError ||
      confirmNewPasswordError
    ) {
      autoCloseAlert(
        "Por favor, rellena el formulario correctamente",
        "warning"
      );
      setIsLoading(false);
      return;
    }

    let userData = { _id: user._id };

    if (user.username !== username) {
      userData.username = username;
    }

    if (user.userDescription !== description) {
      userData.userDescription = description;
    }

    if (uploadedImage) {
      const profileImage = await handleUploadImage(
        uploadedImage,
        "ReactADV/usersAvatars"
      );
      userData.profileImage = profileImage;
    }

    if (user.profileImage !== currentImageUrl) {
      userData.profileImage = currentImageUrl;
    }

    if (oldPassword || newPassword) {
      userData = { ...userData, oldPassword, newPassword };
    }

    dispatch(updateUserInfo(userData))
      .unwrap()
      .then(() => {
        autoCloseAlert("Información actualizada correctamente", "success");
      })
      .catch((error) => {
        autoCloseAlert(error.message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <Grid container>
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              position: "relative",
              mx: "auto",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#414141", mb: 2 }}
            >
              Cambiar imagen de perfil
            </Typography>
            <Avatar
              variant="rounded"
              src={previewImage || currentImageUrl}
              sx={{
                width: { xs: "100%", md: 300 },
                height: "100%",
                mx: "auto",
              }}
            />
            <Button
              size="small"
              sx={{
                position: "absolute",
                fontSize: 8,
                transform: "translate(0%, -100%)",
              }}
              color="success"
              component="label"
              variant="contained"
              startIcon={<UploadFileTwoToneIcon />}
            >
              Subir imagen*
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  handleReadImage(e);
                  setUploadedImage(e.target.files[0]);
                }}
                accept="image/*"
              />
            </Button>
            <Box
              sx={{
                mt: 3,
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <BottomNavigation
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: 300,
                  gap: 2,
                }}
                value={avatars.indexOf(currentImageUrl)}
                onChange={(e, newValue) => {
                  handleAvatarChange(avatars[newValue]);
                }}
              >
                {avatars.map((avatar, index) => (
                  <BottomNavigationAction
                    onClick={() => handleAvatarChange(avatar)}
                    key={index}
                    icon={
                      <Avatar
                        variant="rounded"
                        src={avatar}
                        alt={avatar}
                        sx={{ width: 64, height: 64 }}
                      />
                    }
                  />
                ))}
              </BottomNavigation>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: { xs: 22, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#414141", mb: 2 }}
            >
              Cambiar nombre de usuario
            </Typography>
            <FormControl fullWidth required variant="outlined" sx={{ mb: 2 }}>
              <ValidatedTextField
                label="Nombre de usuario"
                value={username}
                onChange={handleUsernameChange}
                error={usernameError}
                helperText={
                  usernameError
                    ? "Debe tener al menos 8 caracteres, sin espacios ni caracteres especiales."
                    : ""
                }
                type="text"
              />
            </FormControl>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#414141" }}
            >
              {user?.userDescription
                ? "Editar descripción"
                : "Añadir descripción"}
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <ValidatedTextField
                value={description}
                onChange={handleDescriptionChange}
                error={descriptionError}
                helperText={
                  descriptionError ? "Minimo 10 caracteres, maximo 150" : ""
                }
                label="Cuenta un poco sobre ti..."
                type="text"
                multiline
                rows={4}
              />
            </FormControl>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#414141", mt: 3 }}
            >
              Cambiar contraseña
            </Typography>
            <FormControl fullWidth required variant="outlined" sx={{ mt: 2 }}>
              <ValidatedTextField
                label="Contraseña actual"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                type={showOldPassword ? "text" : "password"}
                sx={{ position: "relative" }}
              />
              <ShowOrHidePassword
                password={showOldPassword}
                setter={setShowOldPassword}
              />
            </FormControl>
            <FormControl fullWidth required variant="outlined" sx={{ mt: 3 }}>
              <ValidatedTextField
                label="Contraseña nueva"
                value={newPassword}
                onChange={handleNewPasswordChange}
                error={newPasswordError}
                helperText={
                  newPasswordError
                    ? "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número."
                    : ""
                }
                type={showNewPassword ? "text" : "password"}
                sx={{ position: "relative" }}
              />
              <ShowOrHidePassword
                password={showNewPassword}
                setter={setShowNewPassword}
              />
            </FormControl>

            <FormControl fullWidth required variant="outlined" sx={{ mt: 3 }}>
              <TextField
                size="small"
                type={showConfirmNewPassword ? "text" : "password"}
                label="Confirmar contraseña nueva*"
                value={confirmNewPassword}
                error={confirmNewPasswordError}
                helperText={
                  confirmNewPasswordError ? "Las contraseñas no coinciden" : ""
                }
                onChange={(e) => handleErrorConfirmNewPassword(e)}
                FormHelperTextProps={{ sx: { margin: 0 } }}
              />
              <ShowOrHidePassword
                password={showConfirmNewPassword}
                setter={setShowConfirmNewPassword}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 15, display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
            color="error"
            sx={{ width: "50%" }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Container>
    </>
  );
};

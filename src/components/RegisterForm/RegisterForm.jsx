import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import backgroundRegister from "../../assets/images/bg-register.webp";
import logoRollingCode from "../../assets/images/logoRolling.webp";

import Loader from "../Loader/Loader";
import ValidatedTextField from "../ValidatedTextField/ValidatedTextField";
import useInputValidation from "../../hooks/useInputValidation";
import {
  emailRegex,
  passwordRegex,
  usernameRegex,
} from "../../helpers/regularExpressions";
import { createUser } from "../../redux/actions/user.actions";
import useSweetAlert from "../../hooks/useAlert";
import { confIcon } from "../../helpers/styles";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, emailError, handleEmailChange, resetEmail] =
    useInputValidation(emailRegex);
  const [password, passwordError, handlePasswordChange, resetPassword] =
    useInputValidation(passwordRegex);
  const [username, usernameError, handleUsernameChange, resetUsername] =
    useInputValidation(usernameRegex);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { autoCloseAlert } = useSweetAlert();

  const handleErrorConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(password !== e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (
      usernameError ||
      emailError ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      setIsLoading(false);
      autoCloseAlert(
        "Por favor, rellena el formulario correctamente",
        "warning"
      );
      return;
    }

    dispatch(createUser({ username, email, password }))
      .unwrap()
      .then(() => {
        resetEmail();
        resetPassword();
        resetUsername();
        setConfirmPassword("");
        autoCloseAlert(
          "En breve recibirás un correo para activar tu cuenta",
          "success"
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: `url(${backgroundRegister})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Grid container maxWidth="sm">
          <Grid
            item
            xs={12}
            sx={{ backgroundColor: "#f7f7f7", p: 5, border: "1px solid #ccc" }}
          >
            <Box
              component="img"
              src={logoRollingCode}
              alt="Logo RollingCode Learning Lab"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderBottom: "1px solid #ccc",
              borderLeft: "1px solid #ccc",
            }}
          >
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
            <ValidatedTextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={
                emailError ? "Por favor, introduce un email válido" : ""
              }
              type="email"
            />
            <FormControl fullWidth required variant="outlined" sx={{ mt: 2 }}>
              <ValidatedTextField
                label="Contraseña"
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número."
                    : ""
                }
                type={showPassword ? "text" : "password"}
                sx={{ position: "relative" }}
              />
              {showPassword ? (
                <VisibilityOff
                  sx={confIcon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Visibility
                  sx={confIcon}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </FormControl>

            <FormControl fullWidth required variant="outlined" sx={{ mt: 2 }}>
              <TextField
                size="small"
                id="password2"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="current-password"
                label="Confirmar Contraseña*"
                value={confirmPassword}
                error={confirmPasswordError}
                helperText={
                  confirmPasswordError ? "Las contraseñas no coinciden" : ""
                }
                onChange={(e) => handleErrorConfirmPassword(e)}
                FormHelperTextProps={{ sx: { margin: 0 } }}
              />
              {showConfirmPassword ? (
                <VisibilityOff
                  sx={confIcon}
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Visibility
                  sx={confIcon}
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </FormControl>
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: 0 }}
            >
              Crear cuenta
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundColor: "#fff",
              p: 2,
              borderRight: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ display: "inline", color: "#414141" }}
              >
                Al crear tu cuenta, aceptas los{" "}
                <a
                  href="https://web.rollingcodeschool.com/terminos-y-condiciones/"
                  target="_blank"
                  style={{ color: "#5FA3E0" }}
                >
                  Términos y Condiciones
                </a>{" "}
                de RollingCode School.
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: "gray" }}>
              ¿Ya creaste tu cuenta?
              <Link
                to="/login"
                style={{
                  color: "#5FA3E0",
                  textDecoration: "none",
                  marginLeft: 5,
                }}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RegisterForm;

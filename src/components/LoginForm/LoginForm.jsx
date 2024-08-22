import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import backgroundLogin from "../../assets/images/bg-login.webp";
import logoRollingCode from "../../assets/images/logoRolling.webp";

import useInputValidation from "../../hooks/useInputValidation";
import { emailRegex, passwordRegex } from "../../helpers/regularExpressions";
import { getUser, loginUser } from "../../redux/actions/user.actions";

import ValidatedTextField from "../ValidatedTextField/ValidatedTextField";
import PopoverCookies from "./PopoverCookies/PopoverCookies";
import Loader from "../Loader/Loader";
import useSweetAlert from "../../hooks/useAlert";


const confIcon = {
  position: "absolute",
  right: 10,
  top: 15,
  cursor: "pointer",
  color: "#5FA3E0",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, emailError, handleEmailChange, resetEmail] = useInputValidation(emailRegex);
  const [password, passwordError, handlePasswordChange, resetPassword] = useInputValidation(passwordRegex);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert } = useSweetAlert();


  const handleSubmit = () => {
    setIsLoading(true);
    if (emailError || !email || !password) {
      setIsLoading(false);
      autoCloseAlert("Por favor, rellena el formulario correctamente", "warning");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(loginUser({ email, password }))
          .unwrap()
          .then(() => {
            resetEmail();
            resetPassword();
            autoCloseAlert("Bienvenido", "success");
            dispatch(getUser())
            setTimeout(() => {
              navigate("/");
            }, 3000);
          });
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
          backgroundImage: `url(${backgroundLogin})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            <ValidatedTextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText="Por favor, introduce un email válido"
            />
            
            <FormControl fullWidth required variant="outlined" sx={{ mt: 2 }}>
              <ValidatedTextField
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
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

            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: 0 }}
            >
              Ingresar
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
                Las &apos;Cookies&apos; deben estar habilitadas en su navegador
              </Typography>
              <PopoverCookies />
            </Box>
            <Typography variant="body1" sx={{ color: "gray" }}>
              No estas registrado?
              <Link
                to="/register"
                style={{
                  color: "#5FA3E0",
                  textDecoration: "none",
                  marginLeft: 5,
                }}
              >
                Regístrate aqui
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginForm;

import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import backgroundVerify from "../../assets/images/bg-verify-email.webp";

import clientAxios from "../../utils/client.axios";

import Loader from "../Loader/Loader";
import DefaultButton from "../DefaultButton/DefaultButton";
import useSweetAlert from "../../hooks/useAlert";

const VerifyUserEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState(null);
  const { autoCloseAlert} = useSweetAlert();
  const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated || userFound?.verified) {
        navigate("/");
      } else {
        setIsLoading(true);
        clientAxios
          .get(`/users/get-user-to-verify/${id}`)
          .then((res) => {
            console.log(res.data)
            setUserFound(res.data);
          })
          .catch((error) => {
            autoCloseAlert(error, "error");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, []);

  const handleVerification = async () => {
    setIsLoading(true);

    if (!userFound) {
      setIsLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return autoCloseAlert("No se encontro el usuario", "error");
    }

    if (userFound.verified) {
      setIsLoading(false);
      autoCloseAlert("El usuario ya ha sido verificado", "warning");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }

    try {
      await clientAxios
        .put(`/users/verify-user/${id}`, { verified: true })
        .then((res) => {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
          return autoCloseAlert(res.data.message, "success");
        });
    } catch (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return autoCloseAlert(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundImage: `url(${backgroundVerify})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          maxWidth="sm"
          sx={{
            boxShadow: 10,
            py: 5,
            px: 1,
            mx: "auto",
            maxWidth: { xs: 300, sm: 500 },
            borderRadius: 0,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#2f2f2f", fontWeight: "bold" }}
          >
            ¡Bienvenido/a a Rolling Learning Lab!
          </Typography>
          <Typography sx={{ color: "gray", my: 3 }}>
            Estamos emocionados de que formes parte de nuestra comunidad. Antes
            de comenzar a explorar nuestros workshops y talleres, por favor
            confirma tu dirección de correo electrónico para completar tu
            registro.
          </Typography>
          <DefaultButton
            buttonText="Confirmar Email"
            className="default-button-reverse"
            onclick={handleVerification}
            styles={{ margin: "0 auto", display: "block" }}
          />
        </Box>
      </Container>
    </>
  );
};

export default VerifyUserEmail;

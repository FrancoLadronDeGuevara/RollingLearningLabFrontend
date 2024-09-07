import { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoleRequest,
  getRequest,
  resendRequest,
} from "../../redux/actions/request.actions";
import DefaultButton from "../DefaultButton/DefaultButton";

import bgImage from "../../assets/images/bg-verify-email.webp";
import useSweetAlert from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

export const SpeakerRequestForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { request } = useSelector((state) => state.request);
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const { autoCloseAlert } = useSweetAlert();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getRequest(user._id));
    }
  }, [user]);

  const handleSubmit = () => {
    if (note.trim().length < 20) {
      setError("La nota debe tener al menos 20 caracteres.");
      return;
    }

    const requestData = {
      user: user._id,
      note,
    };

    dispatch(createRoleRequest(requestData))
      .unwrap()
      .then(() => {
        autoCloseAlert("Solicitud enviada", "success");
        setError(null);
        setNote("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const handleResendRequest = () => {
    if (note.trim().length < 20) {
      setError("La nota debe tener al menos 20 caracteres.");
      return;
    }

    const requestData = {
      _id: request._id,
      roleRequest: {
        ...request.roleRequest,
        note,
      },
    };

    dispatch(resendRequest(requestData)).then(() => {
      autoCloseAlert("Solicitud reenviada", "success");
      setError(null);
      setNote("");
      navigate("/");
    });
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, my: 4, mx: 1, maxWidth: "sm" }}>
        {request?.roleRequest?.status === "PENDIENTE" && (
          <Box sx={{ minHeight: "50vh" }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Solicitud pendiente
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              textAlign="center"
              sx={{ mt: 5 }}
            >
              Tu solicitud fue enviada el{" "}
              {new Date(request.updatedAt).toLocaleDateString()}. Estamos
              revisando tu solicitud. Te enviaremos una notificación cuando el
              administrador tome una decisión. Mientras tanto, puedes seguir
              navegando por la plataforma.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <DefaultButton
                buttonText="Volver al inicio"
                className="default-button-reverse"
                onclick={() => navigate("/")}
              />
            </Box>
          </Box>
        )}

        {request?.roleRequest?.status === "RECHAZADA" && (
          <Box sx={{ minHeight: "50vh" }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Solicitud rechazada
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              textAlign="center"
              sx={{ mt: 5 }}
            >
              Lamentablemente, tu solicitud para ser speaker fue rechazada el{" "}
              {new Date(request.updatedAt).toLocaleDateString()}. Puedes revisar
              las razones proporcionadas por el administrador para entender
              mejor la decisión. Si crees que ha habido un error o deseas
              intentarlo nuevamente, puedes enviar una nueva solicitud con más
              detalles.
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Razón:{" "}
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {request?.adminNote}
                </span>
              </Typography>
            </Box>
            <Box my={3}>
              <TextField
                label="Nota para el admin"
                placeholder="Escribe una nota explicando por qué deberíamos considerar tu solicitud..."
                multiline
                rows={4}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                variant="outlined"
                error={!!error}
              />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <DefaultButton
                className="default-button-reverse"
                buttonText="Enviar nueva solicitud"
                onclick={handleResendRequest}
              />
            </Box>
          </Box>
        )}

        {!request?.roleRequest?.status && (
          <Box>
            <Typography variant="h4" gutterBottom textAlign="center">
              Solicitud para ser Speaker
            </Typography>
            <Typography variant="body2" gutterBottom>
              Convertirte en speaker te permitirá compartir tus conocimientos y
              experiencias con la comunidad. Tendrás la oportunidad de crear
              workshops únicos que ayudarán a otros usuarios a aprender y
              crecer. Podrás crear workshops que se activarán una vez que un
              administrador los apruebe, garantizando la calidad y relevancia
              del contenido para la comunidad.
            </Typography>
            <Box my={3}>
              <TextField
                label="Nota para el admin"
                placeholder="Escribe una nota explicando por qué quieres ser speaker..."
                multiline
                rows={4}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                variant="outlined"
                error={!!error}
              />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <DefaultButton
                className="default-button-reverse"
                buttonText="Enviar solicitud"
                onclick={handleSubmit}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

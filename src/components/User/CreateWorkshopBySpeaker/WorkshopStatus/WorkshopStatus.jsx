import {
  Alert,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DefaultButton from "../../../DefaultButton/DefaultButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSweetAlert from "../../../../hooks/useAlert";
import { useDispatch } from "react-redux";
import { resendRequest } from "../../../../redux/actions/request.actions";

const WorkshopStatus = ({ request }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const { autoCloseAlert } = useSweetAlert();

  const handleResendRequest = () => {
    if (note.trim().length < 20) {
      setError("La nota debe tener al menos 20 caracteres.");
      return;
    }

    const requestData = {
      _id: request._id,
      workshopRequest: {
        ...request.workshopRequest,
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
      }}
    >
      <Paper elevation={10} sx={{ p: 4, my: 4, mx: 1, maxWidth: "sm" }}>
        {request?.workshopRequest?.status === "PENDIENTE" && (
          <Box>
            <Typography variant="h4" gutterBottom textAlign="center">
              Workshop en revisión
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              textAlign="center"
              sx={{ mt: 5 }}
            >
              Tu solicitud para crear el workshop fue enviada el{" "}
              {new Date(request.updatedAt).toLocaleDateString()}. Actualmente,
              el workshop está en estado de revisión por un administrador. Te
              notificaremos una vez que se haya tomado una decisión. Mientras
              tanto, puedes seguir navegando por la plataforma.
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

        {request?.workshopRequest?.status === "RECHAZADA" && (
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
              Lamentablemente, tu solicitud para crear el workshop
              fue rechazada el{" "}
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
      </Paper>
    </Container>
  );
};

export default WorkshopStatus;

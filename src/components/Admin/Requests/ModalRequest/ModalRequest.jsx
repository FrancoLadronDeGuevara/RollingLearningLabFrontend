import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../../helpers/styles";
import { useState } from "react";
import useSweetAlert from "../../../../hooks/useAlert";
import { useDispatch } from "react-redux";
import {
  deleteRequest,
  editRequest,
  getAllRequests,
} from "../../../../redux/actions/request.actions";

const ModalRequest = ({ open, handleClose, request }) => {
  const { roleRequest, workshopRequest, adminNote } = request;
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [roleOrWorkshopRequest, setRoleOrWorkshopRequest] = useState(null);
  const { autoCloseAlert, customAlert } = useSweetAlert();
console.log(request)
  const handleSubmit = () => {
    if (roleOrWorkshopRequest === "RECHAZADA" && note.trim().length < 20) {
      setError("La nota debe tener al menos 20 caracteres");
      return;
    }
    setError(null);

    const requestData = {
      _id: request._id,
      adminNote: note,
      referenceId: roleRequest.request
        ? request.user._id
        : request.workshop,
    };

    if (roleRequest.request) {
      requestData.roleRequest = {
        ...request.roleRequest,
        status: roleOrWorkshopRequest,
      };
    } else {
      requestData.workshopRequest = {
        ...request.workshopRequest,
        status: roleOrWorkshopRequest,
      };
    }
    customAlert(
      roleOrWorkshopRequest === "ACEPTADA"
        ? "¿Deseas aceptar la solicitud?"
        : "¿Deseas rechazar la solicitud?",
      () => {
        dispatch(editRequest(requestData)).then(() => {
          autoCloseAlert(
            roleOrWorkshopRequest === "ACEPTADA"
              ? "Se ha aceptado la solicitud"
              : "Se ha rechazado la solicitud",
            "success"
          );
          handleClose();
        });
      }
    );
  };

  const handleDelete = () => {
    customAlert("¿Deseas eliminar esta solicitud?", () => {
      dispatch(deleteRequest(request._id)).then(() => {
        autoCloseAlert("Se ha eliminado la solicitud", "success")
        dispatch(getAllRequests());
      });
      handleClose();
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Estado de la solicitud:{" "}
          {roleRequest.request ? roleRequest.status : workshopRequest.status}
        </Typography>

        {roleRequest.status === "PENDIENTE" ||
        workshopRequest.status === "PENDIENTE" ? (
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                setRoleOrWorkshopRequest(e.target.value);
              }}
              value={roleOrWorkshopRequest}
            >
              <FormControlLabel
                value="ACEPTADA"
                control={<Radio />}
                label="Aceptar solicitud"
              />
              <FormControlLabel
                value="RECHAZADA"
                control={<Radio />}
                label="Rechazar solicitud"
              />
            </RadioGroup>
          </FormControl>
        ) : null}

        {roleRequest.status === "PENDIENTE" ||
        workshopRequest.status === "PENDIENTE" ||
        roleRequest.status === "RECHAZADA" ||
        workshopRequest.status === "RECHAZADA" ? (
          <FormControl sx={{ width: "100%", my: 3 }}>
            <TextField
              label="Nota para el usuario"
              placeholder="Escribe una nota explicando por qué se rechaza la solicitud..."
              multiline
              disabled={
                roleRequest.status === "RECHAZADA" ||
                workshopRequest.status === "RECHAZADA" ||
                roleOrWorkshopRequest === "ACEPTADA"
              }
              rows={4}
              fullWidth
              value={
                roleRequest.status === "RECHAZADA" ||
                workshopRequest.status === "RECHAZADA"
                  ? adminNote
                  : note
              }
              onChange={(e) => setNote(e.target.value)}
              variant="outlined"
              error={!!error}
            />
          </FormControl>
        ) : null}
        {error && <Alert severity="error"> {error}</Alert>}
        <Box sx={{ my: 2 }}>
          <Button
            disabled={
              roleRequest.status === "RECHAZADA" ||
              workshopRequest.status === "RECHAZADA" ||
              roleRequest.status === "APROBADA" ||
              workshopRequest.status === "APROBADA" ||
              !roleOrWorkshopRequest
            }
            variant="contained"
            onClick={handleSubmit}
            sx={{ mr: 2 }}
          >
            Guardar cambios
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Eliminar solicitud
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalRequest;

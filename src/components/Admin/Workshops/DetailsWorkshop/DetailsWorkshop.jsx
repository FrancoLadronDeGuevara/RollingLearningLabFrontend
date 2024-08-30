import { Box, Chip, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../../../helpers/styles";

const DetailsWorkshop = ({ openModal, closeModal, workshop }) => {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    attendees,
    createdBy,
    likes,
    registeredUsers,
  } = workshop;

  return (
    <>
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={modalStyle}>
          <CloseIcon
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              zIndex: 99,
            }}
          />
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
          <Typography>Fecha: {date}</Typography>
          <Typography>Hora: {`${startTime} a ${endTime}`}</Typography>
          <Box sx={{ my: 1, border: "1px solid black", borderRadius: 1, p: 1 }}>
            <Typography variant="subtitle">Descripción:</Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
          <Box sx={{ my: 1, border: "1px solid black", borderRadius: 1, p: 1 }}>
            <Typography variant="subtitle">Asistentes:</Typography>
            {attendees.map((attendee, index) => (
              <Chip label={attendee} key={index} />
            ))}
          </Box>
          <Box sx={{ my: 1, border: "1px solid black", borderRadius: 1, p: 1 }}>
            <Typography variant="subtitle">Likes:</Typography>
            {likes.length === 0 ? (
              <Typography>El workshop no tiene likes</Typography>
            ) : (
              likes.map((like, index) => <Chip label={like.username} key={index} />)
            )}
          </Box>
          <Box sx={{ my: 1, border: "1px solid black", borderRadius: 1, p: 1 }}>
            <Typography variant="subtitle">Registrados:</Typography>
            {registeredUsers.length === 0 ? (
              <Typography>Todavia no hay usuarios registrados</Typography>
            ) : (
              registeredUsers.map((registeredUser, index) => (
                <Chip label={registeredUser.username} key={index} />
              ))
            )}
          </Box>

          <Typography textAlign="center">
            Creado por: {createdBy.username}({createdBy.role.toUpperCase()})
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default DetailsWorkshop;

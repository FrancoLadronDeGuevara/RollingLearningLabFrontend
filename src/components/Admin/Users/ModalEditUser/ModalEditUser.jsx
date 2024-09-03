import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "../../../../redux/actions/user.actions";
import useSweetAlert from "../../../../hooks/useAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "thin solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const ModalEditUser = ({ open, handleClose, user }) => {
  const { _id, email, active, role } = user;
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState(active);
  const [roleUser, setRoleUser] = useState(role);
  const { autoCloseAlert, customAlert } = useSweetAlert();

  const handleEditUser = () => {
    const editedData = { _id, active: activeUser, role: roleUser };
    dispatch(editUser(editedData))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        autoCloseAlert(error.message, "error");
      });
  };

  const handleDeleteUser = () => {
      customAlert("¿Deseas eliminar a este usuario?", () => {
        dispatch(deleteUser(_id)).then(() => {
          autoCloseAlert("Usuario eliminado con exito", "success");
          handleClose()
        })
      })
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <CloseIcon
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
        />

        <Typography
          variant="h6"
          textAlign="center"
        >{`Editar usuario: ${email}`}</Typography>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Activo</InputLabel>
          <Select
            value={activeUser}
            label="Activo"
            onChange={(e) => setActiveUser(e.target.value)}
          >
            <MenuItem value={true}>SI</MenuItem>
            <MenuItem value={false}>NO</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Rol de Usuario</InputLabel>
          <Select
            value={roleUser}
            label="Rol de Usuario"
            onChange={(e) => setRoleUser(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="speaker">Speaker</MenuItem>
            <MenuItem value="user">Usuario</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Button
            onClick={handleEditUser}
            disabled={activeUser == active && roleUser == role}
            variant="contained"
            sx={{ width: "100%", my: 2 }}
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
            sx={{ width: "100%" }}
          >
            Eliminar Usuario
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditUser;

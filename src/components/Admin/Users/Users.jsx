import {
  Avatar,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import InfoIcon from "@mui/icons-material/Info";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../redux/actions/user.actions";
import Loader from "../../Loader/Loader";
import ModalEditUser from "./ModalEditUser/ModalEditUser";
import { createDataUser } from "../../../helpers/createData";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const rows =
    users &&
    users.map((user) =>
      createDataUser(
        user._id,
        user.username,
        user.profileImage,
        user.email,
        user.role,
        user.verified,
        user.registeredWorkshops,
        user.createdWorkshops,
        user.attendanceHistory,
        user.active,
        user.request
      )
    );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container disableGutters>
          <TableContainer component={Paper} sx={{ overflowX: "auto", my: 2 }}>
            <Table aria-label="collapsible table" size="small">
              <TableHead sx={{ backgroundColor: "#333333" }}>
                <TableRow>
                  <TableCell align="left" sx={{ color: "#fff", width: 0 }}>
                    Imagen
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Usuario
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Activo
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Verificado
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Rol
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Editar
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", width: 0 }}>
                    Detalles
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar src={row.profileImage} />
                      </TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">
                        {row.active ? (
                          <Chip label="Si" color="success" />
                        ) : (
                          <Chip label="No" color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {row.verified ? (
                          <CheckOutlinedIcon color="success" />
                        ) : (
                          <CloseOutlinedIcon color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.role === "admin" ? (
                          <Chip label="Admin" color="error" />
                        ) : row.role === "speaker" ? (
                          <Chip label="Speaker" color="warning" />
                        ) : (
                          <Chip label="Usuario" color="primary" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <ModeEditOutlineOutlinedIcon
                          onClick={() => {
                            setSelectedUser(row);
                            setOpenModal(true);
                          }}
                          fontSize="large"
                          sx={{
                            cursor: "pointer",
                            color: "orange",
                            mr: { xs: 0, sm: 1 },
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <InfoIcon
                          fontSize="large"
                          color="info"
                          onClick={() => {
                            navigate(`/user-profile/${row._id}`);
                          }}
                          sx={{
                            cursor: "pointer",
                            mr: { xs: 0, sm: 1 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      No hay usuarios registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {openModal && (
            <ModalEditUser
              open={openModal}
              user={selectedUser}
              handleClose={() => setOpenModal(false)}
            />
          )}
        </Container>
      )}
    </>
  );
};

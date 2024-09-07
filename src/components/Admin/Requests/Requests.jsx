import {
  Box,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Loader from "../../Loader/Loader";
import { createDataRequest } from "../../../helpers/createData";
import { getAllRequests } from "../../../redux/actions/request.actions";
import ModalNote from "./ModalNote/ModalNote";
import ModalRequest from "./ModalRequest/ModalRequest";

export const Requests = () => {
  const dispatch = useDispatch();
  const [openModalRequest, setOpenModalRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openModalNote, setOpenModalNote] = useState(false);
  const [noteFromUser, setNoteFromUser] = useState(null);
  const { requests, loading } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getAllRequests());
  }, []);

  const rows =
    requests &&
    requests.map((request) =>
      createDataRequest(
        request._id,
        request.user,
        request.roleRequest,
        request.workshopRequest,
        request.adminNote
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
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Usuario
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Estado
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Rol
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Solicitud
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", minWidth: 150 }}
                  >
                    Nota
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Ver
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
                      <TableCell align="left">{row.user.username}</TableCell>
                      <TableCell align="center">
                        {row.roleRequest.status !== null ? (
                          <Chip label={row.roleRequest.status} />
                        ) : (
                          <Chip label={row.workshopRequest.status} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.user.role === "user" ? (
                          <Chip color="primary" label="Usuario" />
                        ) : (
                          <Chip color="warning" label="Speaker" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.roleRequest.request ? (
                          <Chip label="Solicitud de Rol" color="secondary" />
                        ) : (
                          <Chip label="Solicitud de Workshop" color="info" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.roleRequest.note !== null ? (
                          <FeedOutlinedIcon
                            onClick={() => {
                              setNoteFromUser(row.roleRequest.note);
                              setSelectedRequest(row);
                              setOpenModalNote(true);
                            }}
                          />
                        ) : row.workshopRequest.note !== null ? (
                          <FeedOutlinedIcon
                            onClick={() => {
                              setNoteFromUser(row.workshopRequest.note);
                              setSelectedRequest(row);
                              setOpenModalNote(true);
                            }}
                          />
                        ) : (
                          <Typography>NO</Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <RemoveRedEyeOutlinedIcon
                          fontSize="large"
                          
                          onClick={() => {
                            setSelectedRequest(row);
                            setOpenModalRequest(true);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={9} sx={{ py: 5 }}>
                      No hay solicitudes pendientes
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      {openModalRequest && (
        <ModalRequest
          open={openModalRequest}
          handleClose={() => setOpenModalRequest(false)}
          request={selectedRequest}
        />
      )}
      {openModalNote && (
        <ModalNote
          open={openModalNote}
          handleClose={() => setOpenModalNote(false)}
          note={noteFromUser}
          user={selectedRequest.user}
        />
      )}
    </>
  );
};

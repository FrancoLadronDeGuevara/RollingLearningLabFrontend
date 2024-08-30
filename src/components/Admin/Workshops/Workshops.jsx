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
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import InfoIcon from "@mui/icons-material/Info";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import DetailsWorkshop from "./DetailsWorkshop/DetailsWorkshop";
import { createDataWorkshop } from "../../../helpers/createData";



export const Workshops = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const { workshops, loading } = useSelector((state) => state.workshop);

  const rows =
    workshops &&
    workshops.map((workshop) =>
      createDataWorkshop(
        workshop._id,
        workshop.title,
        workshop.description,
        workshop.date,
        workshop.startTime,
        workshop.endTime,
        workshop.imageBanner,
        workshop.speakers,
        workshop.attendees,
        workshop.status,
        workshop.comments,
        workshop.urlVideo,
        workshop.urlZoom,
        workshop.active,
        workshop.createdBy,
        workshop.likes,
        workshop.registeredUsers  
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
                    Imagen
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Titulo
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Activo
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", minWidth: 100 }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Speaker/s
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Estado
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", minWidth: 150 }}
                  >
                    Horario
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    Editar
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff", minWidth: 80 }}>
                    Ver más
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
                        <Box
                          component="img"
                          src={row.imageBanner}
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">
                        {row.active ? (
                          <CheckOutlinedIcon color="success" />
                        ) : (
                          <CloseOutlinedIcon color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">
                        {row.speakers.map((s) => (
                          <Chip key={s} label={s} sx={{ my: 1 }} />
                        ))}
                      </TableCell>
                      <TableCell align="center">
                        {row.status === "PENDIENTE" ? (
                          <Chip label={row.status} color="primary" />
                        ) : row.status === "COMPLETADO" ? (
                          <Chip label={row.status} color="success" />
                        ) : (
                          <Chip label={row.status} color="error" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {`De ${row.startTime} a ${row.endTime}`}
                      </TableCell>
                      <TableCell align="center">
                        <ModeEditOutlineOutlinedIcon
                          onClick={() => navigate(`edit-workshop/${row._id}`)}
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
                            setSelectedWorkshop(row);
                            setOpenModal(true);
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
                    <TableCell align="center" colSpan={9} sx={{ py: 5 }}>
                      No hay workshops creados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      {openModal && (
        <DetailsWorkshop openModal={openModal} closeModal={() => setOpenModal(false)} workshop={selectedWorkshop}/>
      )
    }
    </>
  );
};

import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import { VisuallyHiddenInput } from "../../../../helpers/styles";
import useImageHandler from "../../../../hooks/useImageHandler";
import { useState, useEffect } from "react";
import ValidatedTextField from "../../../ValidatedTextField/ValidatedTextField";
import useInputValidation from "../../../../hooks/useInputValidation";
import {
  descriptionRegex,
  workshopNameRegex,
} from "../../../../helpers/regularExpressions";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useSweetAlert from "../../../../hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../../../../redux/actions/event.actions";

export const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { event } = useSelector((state) => state.event);
  const { previewImage, handleReadImage, handleUploadImage } =
    useImageHandler();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [title, titleError, handleTitleChange, resetTitle, setTitle] =
    useInputValidation(workshopNameRegex);
  const [
    description,
    descriptionError,
    handleDescriptionChange,
    resetDescription,
    setDescription,
  ] = useInputValidation(descriptionRegex);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [activeEvent, setActiveEvent] = useState(false);
  const [eventStatus, setEventStatus] = useState("");
  const { autoCloseAlert, customAlert } = useSweetAlert();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getEvent(id));
  }, []);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setSelectedDate(dayjs(event.date, "DD-MM-YYYY") || null);
      setStartTime(dayjs(event.startTime, "HH:mm") || null);
      setEndTime(dayjs(event.endTime, "HH:mm") || null);
      setCurrentImageUrl(event.imageBanner || null);
      setActiveEvent(event.active || false);
      setEventStatus(event.status || "");
    }
  }, [event]);
  const handleEndTimeChange = (newValue) => {
    if (startTime) {
      if (newValue.isSame(startTime)) {
        setTimeError(
          "La hora de finalización no puede ser igual a la hora de inicio."
        );
        return;
      }

      const duration = dayjs(newValue).diff(startTime, "hour", true);
      if (duration > 8 || duration < 1) {
        setTimeError("El evento tiene una duración no válida.");
        return;
      } else {
        setTimeError("");
      }
    }
    setEndTime(newValue);
  };

  const handleUpdateEvent = () => {
    customAlert("¿Deseas actualizar este evento?", async () => {
      setIsLoading(true);
      if (timeError) {
        setIsLoading(false);
        return autoCloseAlert(timeError, "error");
      }

      if (!startTime || !endTime || !selectedDate || !title || !description) {
        setIsLoading(false);
        return autoCloseAlert("Todos los campos son obligatorios", "error");
      }

      let eventData = { _id: event._id };

      if (event.title !== title) eventData.title = title;
      if (event.description !== description)
        eventData.description = description;
      if (event.date !== selectedDate.format("DD-MM-YYYY"))
        eventData.date = selectedDate.format("DD-MM-YYYY");
      if (event.startTime !== startTime.format("HH:mm"))
        eventData.startTime = startTime.format("HH:mm");
      if (event.endTime !== endTime.format("HH:mm"))
        eventData.endTime = endTime.format("HH:mm");
      if (event.active !== activeEvent) eventData.active = activeEvent;
      if (event.status !== eventStatus) eventData.status = eventStatus;
      if (uploadedImage) {
        const imageBanner = await handleUploadImage(
          uploadedImage,
          "ReactADV/workshops"
        );
        eventData.imageBanner = imageBanner;
      }

      dispatch(updateEvent(eventData))
        .unwrap()
        .then(() => {
          dispatch(getAllEvents());
          autoCloseAlert("Se ha actualizado el evento", "success");
          navigate("/admin/events");
        })
        .catch((error) => {
          autoCloseAlert(error.message, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const handleDeleteEvent = () => {
    customAlert("¿Deseas eliminar este evento?", () => {
      dispatch(deleteEvent(event._id))
        .unwrap()
        .then(() => {
          setIsLoading(true);
          autoCloseAlert("Se ha eliminado el evento", "success");
          dispatch(getAllEvents());
          navigate("/admin/events");
        })
        .catch((error) => {
          autoCloseAlert(error.message, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: "relative",
            mx: "auto",
            height: 350,
          }}
        >
          <Avatar
            variant="rounded"
            src={previewImage || currentImageUrl}
            sx={{
              width: "100%",
              height: "100%",
              mx: "auto",
            }}
          />
          <Button
            size="small"
            sx={{
              position: "absolute",
              fontSize: 8,
              transform: "translate(0, -100%)",
            }}
            color="success"
            component="label"
            variant="contained"
            startIcon={<UploadFileTwoToneIcon />}
          >
            Cambiar imagen*
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                handleReadImage(e);
                setUploadedImage(e.target.files[0]);
              }}
              accept="image/*"
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <ValidatedTextField
              value={title}
              onChange={handleTitleChange}
              error={titleError}
              helperText={
                titleError ? "El título del workshop no es válido" : ""
              }
              label="Título"
              type="text"
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <ValidatedTextField
              value={description}
              onChange={handleDescriptionChange}
              error={descriptionError}
              helperText={descriptionError ? "La descripción no es válida" : ""}
              label="Descripción"
              type="text"
              multiline
              rows={4}
            />
          </FormControl>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <DatePicker
                  label="Fecha"
                  format="DD/MM/YYYY"
                  value={selectedDate}
                  minDate={dayjs()}
                  maxDate={dayjs().add(1, "year")}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                />
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}
              >
                <TimePicker
                  label="Hora de inicio"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                    if (endTime) {
                      handleEndTimeChange(endTime);
                    }
                  }}
                />
                <TimePicker
                  label="Hora de finalización"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </FormControl>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Activo</InputLabel>
            <Select
              value={activeEvent}
              label="Activo"
              onChange={(e) => setActiveEvent(e.target.value)}
            >
              <MenuItem value={true}>SI</MenuItem>
              <MenuItem value={false}>NO</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={eventStatus}
              label="Estado"
              onChange={(e) => setEventStatus(e.target.value)}
            >
              <MenuItem value="PENDIENTE">PENDIENTE</MenuItem>
              <MenuItem value="COMPLETADO">COMPLETADO</MenuItem>
              <MenuItem value="CANCELADO">CANCELADO</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateEvent}
            fullWidth
          >
            Actualizar Evento
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteEvent}
            fullWidth
          >
            Eliminar Evento
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

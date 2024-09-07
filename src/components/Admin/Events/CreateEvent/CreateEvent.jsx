import { Avatar, Box, Button, FormControl, Grid } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

import { VisuallyHiddenInput } from "../../../../helpers/styles";
import ValidatedTextField from "../../../ValidatedTextField/ValidatedTextField";
import { useState } from "react";
import useSweetAlert from "../../../../hooks/useAlert";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useImageHandler from "../../../../hooks/useImageHandler";
import {
  descriptionRegex,
  workshopNameRegex,
} from "../../../../helpers/regularExpressions";
import useInputValidation from "../../../../hooks/useInputValidation";
import Loader from "../../../Loader/Loader";
import { createEvent } from "../../../../redux/actions/event.actions";

export const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { previewImage, handleReadImage, handleUploadImage } =
    useImageHandler();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, titleError, handleTitleChange, resetTitle] =
    useInputValidation(workshopNameRegex);
  const [
    description,
    descriptionError,
    handleDescriptionChange,
    resetDescription,
  ] = useInputValidation(descriptionRegex);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert } = useSweetAlert();

  const handleEndTimeChange = (newValue) => {
    if (startTime) {
      if (newValue.isSame(startTime)) {
        setTimeError(
          "La hora de finalización no puede ser igual a la hora de inicio."
        );
        return;
      }

      const duration = dayjs(newValue).diff(startTime, "hour", true);
      if (duration > 10 || duration < 1) {
        setTimeError("El evento tiene una duración no válida.");
        return;
      } else {
        setTimeError("");
      }
    }
    setEndTime(newValue);
  };

  const handleAddEvent = async () => {
    setIsLoading(true);
    if (timeError) {
      setIsLoading(false);
      return autoCloseAlert(timeError, "error");
    }

    if (
      !startTime ||
      !endTime ||
      !selectedDate ||
      !title ||
      !description ||
      !uploadedImage
    ) {
      setIsLoading(false);
      return autoCloseAlert("Todos los campos son obligatorios", "error");
    }

    const imageBanner = await handleUploadImage(
      uploadedImage,
      "ReactADV/events"
    );
    const event = {
      title,
      description,
      date: selectedDate.format("DD-MM-YYYY"),
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
      imageBanner,
    };

    dispatch(createEvent(event))
      .unwrap()
      .then(() => {
        autoCloseAlert("El evento se ha creado correctamente", "success");
        resetTitle();
        resetDescription();
        setSelectedDate(null);
        setStartTime(null);
        setEndTime(null);
        navigate("/admin/events");
      })
      .catch((error) => {
        autoCloseAlert(error, "error");
      })
      .finally(() => {
        setIsLoading(false);
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
          }}
        >
          <Avatar
            variant="rounded"
            src={previewImage}
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
            Subir imagen*
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
              helperText={titleError ? "El título del evento no es válido" : ""}
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
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: 2,
                }}
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

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddEvent}
          sx={{ mt: 2, width: "50%", mx: "auto" }}
        >
          Crear evento
        </Button>
      </Grid>
    </>
  );
};

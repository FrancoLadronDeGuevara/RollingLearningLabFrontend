// import {
//   Avatar,
//   Box,
//   Button,
//   Chip,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
// import AddIcon from "@mui/icons-material/Add";
// import { VisuallyHiddenInput } from "../../../../helpers/styles";
// import useImageHandler from "../../../../hooks/useImageHandler";
// import { useState, useEffect } from "react";
// import ValidatedTextField from "../../../ValidatedTextField/ValidatedTextField";
// import useInputValidation from "../../../../hooks/useInputValidation";
// import {
//   descriptionRegex,
//   speakerRegex,
//   workshopNameRegex,
//   zoomUrlRegex,
// } from "../../../../helpers/regularExpressions";
// import {
//   DatePicker,
//   LocalizationProvider,
//   TimePicker,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import useSweetAlert from "../../../../hooks/useAlert";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteWorkshop,
//   getAllWorkshops,
//   getWorkshop,
//   updateWorkshop,
// } from "../../../../redux/actions/workshop.actions";
// import Loader from "../../../Loader/Loader";
// import { useNavigate, useParams } from "react-router-dom";

// export const CompletedWorkshop = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { workshop } = useSelector((state) => state.workshop);
//   const { previewImage, handleReadImage, handleUploadImage } =
//     useImageHandler();
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [currentImageUrl, setCurrentImageUrl] = useState(null);
//   const [title, titleError, handleTitleChange, resetTitle, setTitle] =
//     useInputValidation(workshopNameRegex);
//   const [
//     description,
//     descriptionError,
//     handleDescriptionChange,
//     resetDescription,
//     setDescription,
//   ] = useInputValidation(descriptionRegex);
//   const [newSpeaker, newSpeakerError, handleNewSpeakerChange, resetNewSpeaker] =
//     useInputValidation(speakerRegex);
//   const [
//     newAttendee,
//     newAttendeeError,
//     handleNewAttendeeChange,
//     resetNewAttendee,
//   ] = useInputValidation(speakerRegex);
//   const [urlZoom, urlZoomError, handleUrlZoomChange, resetUrlZoom, setUrlZoom] =
//     useInputValidation(zoomUrlRegex);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [timeError, setTimeError] = useState(null);
//   const [speakers, setSpeakers] = useState([]);
//   const [attendees, setAttendees] = useState([]);
//   const [activeWorkshop, setActiveWorkshop] = useState(false);
//   const [workshopStatus, setWorkshopStatus] = useState("");
//   const { autoCloseAlert, customAlert } = useSweetAlert();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     dispatch(getWorkshop(id));
//   }, []);

//   useEffect(() => {
//     if (workshop) {
//       setTitle(workshop.title || "");
//       setDescription(workshop.description || "");
//       setSelectedDate(dayjs(workshop.date, "DD-MM-YYYY") || null);
//       setStartTime(dayjs(workshop.startTime, "HH:mm") || null);
//       setEndTime(dayjs(workshop.endTime, "HH:mm") || null);
//       setSpeakers(workshop.speakers || []);
//       setAttendees(workshop.attendees || []);
//       setUrlZoom(workshop.urlZoom || "");
//       setCurrentImageUrl(workshop.imageBanner || null);
//       setActiveWorkshop(workshop.active || false);
//       setWorkshopStatus(workshop.status || "");
//     }
//   }, [workshop]);
//   const handleEndTimeChange = (newValue) => {
//     if (startTime) {
//       if (newValue.isSame(startTime)) {
//         setTimeError(
//           "La hora de finalización no puede ser igual a la hora de inicio."
//         );
//         return;
//       }

//       const duration = dayjs(newValue).diff(startTime, "hour", true);
//       if (duration > 5 || duration < 1) {
//         setTimeError("El workshop tiene una duración no válida.");
//         return;
//       } else {
//         setTimeError("");
//       }
//     }
//     setEndTime(newValue);
//   };

//   const handleAddSpeaker = () => {
//     if (newSpeaker.trim()) {
//       setSpeakers([...speakers, newSpeaker.trim()]);
//       resetNewSpeaker();
//     }
//   };

//   const handleAddAssistant = () => {
//     if (newAttendee.trim()) {
//       setAttendees([...attendees, newAttendee.trim()]);
//       resetNewAttendee();
//     }
//   };

//   const handleUpdateWorkshop = () => {
//     customAlert("¿Deseas actualizar este workshop?", async () => {
//       setIsLoading(true);
//       if (timeError) {
//         setIsLoading(false);
//         return autoCloseAlert(timeError, "error");
//       }

//       if (
//         !startTime ||
//         !endTime ||
//         !selectedDate ||
//         !title ||
//         !description ||
//         !speakers.length ||
//         !urlZoom
//       ) {
//         setIsLoading(false);
//         return autoCloseAlert("Todos los campos son obligatorios", "error");
//       }

//       let workshopData = { _id: workshop._id };

//       if (workshop.title !== title) workshopData.title = title;
//       if (workshop.description !== description)
//         workshopData.description = description;
//       if (workshop.date !== selectedDate.format("DD-MM-YYYY"))
//         workshopData.date = selectedDate.format("DD-MM-YYYY");
//       if (workshop.startTime !== startTime.format("HH:mm"))
//         workshopData.startTime = startTime.format("HH:mm");
//       if (workshop.endTime !== endTime.format("HH:mm"))
//         workshopData.endTime = endTime.format("HH:mm");
//       if (workshop.speakers !== speakers) workshopData.speakers = speakers;
//       if (workshop.attendees !== attendees) workshopData.attendees = attendees;
//       if (workshop.urlZoom !== urlZoom) workshopData.urlZoom = urlZoom;
//       if (workshop.active !== activeWorkshop)
//         workshopData.active = activeWorkshop;
//       if (workshop.status !== workshopStatus)
//         workshopData.status = workshopStatus;
//       if (uploadedImage) {
//         const imageBanner = await handleUploadImage(
//           uploadedImage,
//           "ReactADV/workshops"
//         );
//         workshopData.imageBanner = imageBanner;
//       }

//       dispatch(updateWorkshop(workshopData))
//         .unwrap()
//         .then(() => {
//           dispatch(getAllWorkshops());
//           autoCloseAlert("Se ha actualizado el workshop", "success");
//           navigate("/admin/workshops");
//         })
//         .catch((error) => {
//           autoCloseAlert(error.message, "error");
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     });
//   };

//   const handleDeleteWorkshop = () => {
//     customAlert("¿Deseas eliminar este workshop?", () => {
//       dispatch(deleteWorkshop(workshop._id))
//         .unwrap()
//         .then(() => {
//           setIsLoading(true);
//           autoCloseAlert("Se ha eliminado el workshop", "success");
//           dispatch(getAllWorkshops());
//           navigate("/admin/workshops");
//         })
//         .catch((error) => {
//           autoCloseAlert(error.message, "error");
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     });
//   };

//   return (
//     <>
//       {isLoading && <Loader />}
//       <Grid container spacing={2}>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             position: "relative",
//             mx: "auto",
//             height: 350,
//           }}
//         >
//           <Avatar
//             variant="rounded"
//             src={previewImage || currentImageUrl}
//             sx={{
//               width: "100%",
//               height: "100%",
//               mx: "auto",
//             }}
//           />
//           <Button
//             size="small"
//             sx={{
//               position: "absolute",
//               fontSize: 8,
//               transform: "translate(0, -100%)",
//             }}
//             color="success"
//             component="label"
//             variant="contained"
//             startIcon={<UploadFileTwoToneIcon />}
//           >
//             Cambiar imagen*
//             <VisuallyHiddenInput
//               type="file"
//               onChange={(e) => {
//                 handleReadImage(e);
//                 setUploadedImage(e.target.files[0]);
//               }}
//               accept="image/*"
//             />
//           </Button>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <FormControl fullWidth>
//             <ValidatedTextField
//               value={title}
//               onChange={handleTitleChange}
//               error={titleError}
//               helperText={
//                 titleError ? "El título del workshop no es válido" : ""
//               }
//               label="Título"
//               type="text"
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <ValidatedTextField
//               value={description}
//               onChange={handleDescriptionChange}
//               error={descriptionError}
//               helperText={descriptionError ? "La descripción no es válida" : ""}
//               label="Descripción"
//               type="text"
//               multiline
//               rows={4}
//             />
//           </FormControl>
//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <FormControl fullWidth>
//                 <DatePicker
//                   label="Fecha"
//                   format="DD/MM/YYYY"
//                   value={selectedDate}
//                   minDate={dayjs()}
//                   maxDate={dayjs().add(1, "year")}
//                   onChange={(newValue) => {
//                     setSelectedDate(newValue);
//                   }}
//                 />
//               </FormControl>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <FormControl
//                 sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}
//               >
//                 <TimePicker
//                   label="Hora de inicio"
//                   value={startTime}
//                   onChange={(newValue) => {
//                     setStartTime(newValue);
//                     if (endTime) {
//                       handleEndTimeChange(endTime);
//                     }
//                   }}
//                 />
//                 <TimePicker
//                   label="Hora de finalización"
//                   value={endTime}
//                   onChange={handleEndTimeChange}
//                 />
//               </FormControl>
//             </LocalizationProvider>
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Box sx={{ display: "flex", gap: 2, minHeight: { xs: 50, md: 100 } }}>
//             <ValidatedTextField
//               value={newSpeaker}
//               onChange={handleNewSpeakerChange}
//               error={newSpeakerError}
//               helperText={
//                 newSpeakerError ? "El nombre del speaker no es válido" : ""
//               }
//               label="Speaker"
//               type="text"
//               fullWidth
//             />
//             <Button
//               onClick={() => {
//                 handleAddSpeaker();
//                 resetNewSpeaker();
//               }}
//               variant="contained"
//               color="info"
//               sx={{ height: "100%" }}
//               endIcon={<AddIcon />}
//             >
//               Agregar
//             </Button>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               minHeight: { xs: 50, md: 100 },
//               mt: 2,
//             }}
//           >
//             <ValidatedTextField
//               value={newAttendee}
//               onChange={handleNewAttendeeChange}
//               error={newAttendeeError}
//               helperText={
//                 newAttendeeError ? "El nombre del asistente no es válido" : ""
//               }
//               label="Asistente"
//               type="text"
//               fullWidth
//             />
//             <Button
//               onClick={() => {
//                 handleAddAssistant();
//                 resetNewAttendee();
//               }}
//               variant="contained"
//               color="info"
//               sx={{ height: "100%" }}
//               endIcon={<AddIcon />}
//             >
//               Agregar
//             </Button>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               bgcolor: "#f2f2f2",
//               px: 1,
//               border: "1px solid lightgray",
//               borderRadius: 1,
//               minHeight: 100,
//             }}
//           >
//             <Typography variant="h6" sx={{ color: "gray" }}>
//               Speakers:
//             </Typography>
//             {speakers.map((speaker, index) => (
//               <Chip
//                 key={index}
//                 label={speaker}
//                 variant="outlined"
//                 onDelete={() =>
//                   setSpeakers(speakers.filter((s) => s !== speaker))
//                 }
//                 sx={{ mr: 1, mb: 1 }}
//               />
//             ))}
//           </Box>
//           <Box
//             sx={{
//               bgcolor: "#f2f2f2",
//               px: 1,
//               mt: 2,
//               border: "1px solid lightgray",
//               borderRadius: 1,
//               minHeight: 100,
//             }}
//           >
//             <Typography variant="h6" sx={{ color: "gray" }}>
//               Asistentes:
//             </Typography>
//             {attendees.map((attendee, index) => (
//               <Chip
//                 key={index}
//                 label={attendee}
//                 variant="outlined"
//                 onDelete={() =>
//                   setAttendees(attendees.filter((a) => a !== attendee))
//                 }
//                 sx={{ mr: 1, mb: 1 }}
//               />
//             ))}
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <ValidatedTextField
//             value={urlZoom}
//             onChange={handleUrlZoomChange}
//             error={urlZoomError}
//             helperText={urlZoomError ? "La URL de Zoom no es válida" : ""}
//             label="URL de Zoom"
//             type="text"
//             fullWidth
//           />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 2,
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Activo</InputLabel>
//             <Select
//               value={activeWorkshop}
//               label="Activo"
//               onChange={(e) => setActiveWorkshop(e.target.value)}
//             >
//               <MenuItem value={true}>SI</MenuItem>
//               <MenuItem value={false}>NO</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Estado</InputLabel>
//             <Select
//               value={workshopStatus}
//               label="Estado"
//               onChange={(e) => setWorkshopStatus(e.target.value)}
//             >
//               <MenuItem value="PENDIENTE">PENDIENTE</MenuItem>
//               <MenuItem value="COMPLETADO">COMPLETADO</MenuItem>
//               <MenuItem value="CANCELADO">CANCELADO</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 2,
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <Button
//             variant="contained"
//             color="success"
//             onClick={handleUpdateWorkshop}
//             fullWidth
//           >
//             Actualizar Workshop
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteWorkshop}
//             fullWidth
//           >
//             Eliminar Workshop
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

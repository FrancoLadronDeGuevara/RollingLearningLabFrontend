// import {
//   Avatar,
//   Box,
//   Button,
//   Chip,
//   FormControl,
//   Grid,
//   Typography,
// } from "@mui/material";
// import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
// import AddIcon from "@mui/icons-material/Add";
// import { VisuallyHiddenInput } from "../../../../helpers/styles";
// import useImageHandler from "../../../../hooks/useImageHandler";
// import { useState } from "react";
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
// import { useDispatch } from "react-redux";
// import { createWorkshop, getAllWorkshops } from "../../../../redux/actions/workshop.actions";
// import Loader from "../../../Loader/Loader";
// import { useNavigate } from "react-router-dom";

// export const NextWorkshop = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { previewImage, handleReadImage, handleUploadImage } =
//     useImageHandler();
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [title, titleError, handleTitleChange, resetTitle] =
//     useInputValidation(workshopNameRegex);
//   const [
//     description,
//     descriptionError,
//     handleDescriptionChange,
//     resetDescription,
//   ] = useInputValidation(descriptionRegex);
//   const [newSpeaker, newSpeakerError, handleNewSpeakerChange, resetNewSpeaker] =
//     useInputValidation(speakerRegex);
//   const [
//     newAttendee,
//     newAttendeeError,
//     handleNewAttendeeChange,
//     resetNewAttendee,
//   ] = useInputValidation(speakerRegex);
//   const [urlZoom, urlZoomError, handleUrlZoomChange, resetUrlZoom] =
//     useInputValidation(zoomUrlRegex);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [timeError, setTimeError] = useState(null);
//   const [speakers, setSpeakers] = useState([]);
//   const [attendees, setAttendees] = useState([]);
//   const { autoCloseAlert } = useSweetAlert();
//   const [isLoading, setIsLoading] = useState(false);

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

//   const handleCreateWorkshop = async () => {
//     setIsLoading(true);
//     if (timeError) {
//       setIsLoading(false);
//       return autoCloseAlert(timeError, "error");
//     }
//     if (
//       !startTime ||
//       !endTime ||
//       !selectedDate ||
//       !title ||
//       !description ||
//       !speakers.length ||
//       !uploadedImage ||
//       !urlZoom
//     ) {
//       setIsLoading(false);
//       return autoCloseAlert("Todos los campos son obligatorios", "error");
//     }

//     const imageBanner = await handleUploadImage(
//       uploadedImage,
//       "ReactADV/workshops"
//     );

//     const workshop = {
//       title,
//       description,
//       date: selectedDate.format("DD-MM-YYYY"),
//       startTime: startTime.format("HH:mm"),
//       endTime: endTime.format("HH:mm"),
//       imageBanner,
//       speakers,
//       attendees,
//       urlZoom,
//     };

//     dispatch(createWorkshop(workshop))
//       .unwrap()
//       .then(() => {
//         autoCloseAlert("Se ha creado el workshop", "success");
//         resetTitle();
//         resetDescription();
//         resetNewSpeaker();
//         resetNewAttendee();
//         resetUrlZoom();
//         setSelectedDate(null);
//         setStartTime(null);
//         setEndTime(null);
//         setSpeakers([]);
//         setAttendees([]);
//         setUploadedImage(null);
//         dispatch(getAllWorkshops());
//         navigate("/admin/workshops");
//       })
//       .catch((error) => {
//         autoCloseAlert(error.message, "error");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
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
//           }}
//         >
//           <Avatar
//             variant="rounded"
//             src={previewImage}
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
//             Subir imagen*
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
//               onClick={handleAddAssistant}
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
//       </Grid>
//       <ValidatedTextField
//         value={urlZoom}
//         onChange={handleUrlZoomChange}
//         error={urlZoomError}
//         helperText={urlZoomError ? "La url del zoom no es válida" : ""}
//         label="Url Zoom"
//         type="text"
//         fullWidth
//         sx={{ mt: 2 }}
//       />
//       <Box
//         sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
//       >
//         <Button
//           color="info"
//           variant="contained"
//           onClick={handleCreateWorkshop}
//           sx={{ width: "50%" }}
//         >
//           Crear Workshop
//         </Button>
//       </Box>
//     </>
//   );
// };

// import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getUserById } from "../../../../redux/actions/user.actions";

// export const ChangeToSpeaker = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getUserById(id));
//   }, []);

//   return (
//     <Grid container>
//       <Grid item xs={12} md={4}>
//         <Avatar
//           alt="user profile image"
//           src={selectedUser?.profileImage}
//           sx={{ width: 200, height: 200, mx: "auto" }}
//         />
//         <Typography variant="h4" textAlign="center">
//           {selectedUser?.username}
//         </Typography>
//         <Typography variant="body1" textAlign="center" sx={{ my: 2 }}>
//           {selectedUser?.email}
//         </Typography>
//         <Box display="flex" justifyContent="center">
//           {selectedUser?.role === "admin" ? (
//             <Chip label="ADMINISTRADOR" color="error" />
//           ) : selectedUser?.role === "user" ? (
//             <Chip label="USUARIO" color="primary" />
//           ) : (
//             <Chip label="SPEAKER" color="warning" />
//           )}
//         </Box>
//       </Grid>
//       <Grid item xs={12} md={8}>
//         <Box>
//           <Typography variant="h5" textAlign="left" sx={{ my: 2 }}>
//             Favoritos:
//           </Typography>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

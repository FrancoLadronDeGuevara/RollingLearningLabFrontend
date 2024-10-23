import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Collapse,
  Typography,
  Chip,
} from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert";
import { logoutUser } from "../../../redux/actions/user.actions";
import { useState } from "react";
import DefaultButton from "../../DefaultButton/DefaultButton";

const itemsList = [
  {
    value: 0,
    name: "Ir al Inicio",
    path: "/",
    icon: <HomeOutlinedIcon sx={{ color: "#414141" }} />,
  },
];

const DrawerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { customAlert, autoCloseAlert } = useSweetAlert();
  const [openWorkshops, setOpenWorkshops] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  const handleLogoutUser = () => {
    customAlert("¿Deseas cerrar sesión?", () => {
      dispatch(logoutUser()).then(() => {
        autoCloseAlert("Sesión cerrada con éxito", "success");
        navigate("/");
      });
    });
  };

  const handleWorkshopsClick = () => {
    setOpenWorkshops(!openWorkshops);
  };

  const handleEventsClick = () => {
    setOpenEvents(!openEvents);
  };

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        color: "#414141",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Avatar
          alt="user profile image"
          src={user?.profileImage}
          sx={{ m: 1, width: 100, height: 100, mx: "auto" }}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {user?.username}
          </Typography>
          {user?.role === "admin" ? (
            <Chip label="Administrador" color="error" sx={{ width: 100 }} />
          ) : user?.role === "speaker" ? (
            <Chip label="Speaker" color="warning" sx={{ width: 100 }} />
          ) : (
            <Chip label="Usuario" color="primary" sx={{ width: 100 }} />
          )}
        </Box>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {itemsList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {user?.role === "speaker" && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("create-workshop")}>
              <ListItemIcon>
                <DesignServicesOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Crear Workshop" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={handleUsersClick}>
            <ListItemIcon>
              <ManageAccountsOutlinedIcon sx={{ color: "#414141" }} />
            </ListItemIcon>
            <ListItemText primary="Opciones" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ backgroundColor: "#e3e3e3", pl: 2 }}
          >
            <ListItemButton onClick={() => navigate("config")}>
              <ListItemIcon>
                <SettingsOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
            {user?.role === "user" && (
              <ListItemButton onClick={() => navigate("/user/speaker-request")}>
                <ListItemIcon>
                  <SpeakerNotesOutlinedIcon sx={{ color: "#414141" }} />
                </ListItemIcon>
                <ListItemText primary="Solicitar Speaker" />
              </ListItemButton>
            )}
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleWorkshopsClick}>
            <ListItemIcon>
              <SchoolOutlinedIcon sx={{ color: "#414141" }} />
            </ListItemIcon>
            <ListItemText primary="Workshops" />
            {openWorkshops ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openWorkshops} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ backgroundColor: "#e3e3e3", pl: 2 }}
          >
            <ListItemButton onClick={() => navigate("workshops/favorites")}>
              <ListItemIcon>
                <FavoriteOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("workshops/completed")}>
              <ListItemIcon>
                <CheckCircleOutlineOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Asistidos" />
            </ListItemButton>
            {user?.role === "admin" ? (
              <ListItemButton onClick={() => navigate("workshops/created")}>
                <ListItemIcon>
                  <DesignServicesOutlinedIcon sx={{ color: "#414141" }} />
                </ListItemIcon>
                <ListItemText primary="Creados" />
              </ListItemButton>
            ) : user?.role === "speaker" ? (
              <ListItemButton onClick={() => navigate("workshops/created")}>
                <ListItemIcon>
                  <DesignServicesOutlinedIcon sx={{ color: "#414141" }} />
                </ListItemIcon>
                <ListItemText primary="Creados" />
              </ListItemButton>
            ) : null}
            <ListItemButton onClick={() => navigate("workshops/registered")}>
              <ListItemIcon>
                <ScheduleOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Próximos" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleEventsClick}>
            <ListItemIcon>
              <EventOutlinedIcon sx={{ color: "#414141" }} />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
            {openEvents ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ backgroundColor: "#e3e3e3", pl: 2 }}
          >
            <ListItemButton onClick={() => navigate("events/favorites")}>
              <ListItemIcon>
                <FavoriteOutlinedIcon sx={{ color: "#414141" }} />
              </ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <DefaultButton
          onclick={handleLogoutUser}
          styles={{ marginLeft: "auto", marginRight: 10 }}
          className="default-button-reverse"
          buttonText="Cerrar Sesión"
        />
      </List>
    </Box>
  );
};

export default DrawerList;

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
} from "@mui/material";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert";
import { logoutUser } from "../../../redux/actions/user.actions";
import { useState } from "react";

const itemsList = [
  {
    value: 0,
    name: "Ir al Inicio",
    path: "/",
    icon: <HomeOutlinedIcon sx={{ color: "primary.main" }} />,
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
    <div>
      <Divider />
      <Avatar
        alt="user profile image"
        src={user?.profileImage}
        sx={{ m: 1, width: 100, height: 100, mx: "auto" }}
      />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          onClick={() => navigate("/user/info")}
          variant="contained"
          sx={{
            my: 2,
            color: "#fff",
            fontSize: 14,
            backgroundColor: "#d81d26",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          {user?.username}
        </Button>
      </Box>
      <Divider />
      <List>
        {itemsList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={handleUsersClick}>
            <ListItemIcon>
              <ManageAccountsOutlinedIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Opciones de usuario" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("config")}>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/user/change-to-speaker")}>
              <ListItemIcon>
                <SpeakerNotesOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Solicitar Speaker" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleWorkshopsClick}>
            <ListItemIcon>
              <SchoolOutlinedIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Workshops" />
            {openWorkshops ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openWorkshops} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton
              onClick={() => navigate("/user/user-workshops/fav-workshop")}
            >
              <ListItemIcon>
                <FavoriteOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Workshops Favoritos" />
            </ListItemButton>
            <ListItemButton
              onClick={() =>
                navigate("/user/user-workshops/completed-workshop")
              }
            >
              <ListItemIcon>
                <CheckCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Workshops Completados" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/user/user-workshops/next-workshop")}
            >
              <ListItemIcon>
                <ScheduleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Próximos Workshops" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleEventsClick}>
            <ListItemIcon>
              <EventOutlinedIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
            {openEvents ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openEvents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton
              onClick={() => navigate("/user/user-events/fav-event")}
            >
              <ListItemIcon>
                <FavoriteOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Eventos Favoritos" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/user/user-events/completed-event")}
            >
              <ListItemIcon>
                <CheckCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Eventos Completados" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/user/user-events/next-event")}
            >
              <ListItemIcon>
                <ScheduleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Próximos Eventos" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={handleLogoutUser}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutOutlinedIcon sx={{ color: "#d81d26" }} />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerList;

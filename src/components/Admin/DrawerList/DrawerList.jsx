import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert";
import { logoutUser } from "../../../redux/actions/user.actions";
import DefaultButton from "../../DefaultButton/DefaultButton";

const itemsList = [
  {
    value: 0,
    name: "Ir al Inicio",
    path: "/",
    icon: <HomeOutlinedIcon sx={{ color: "#414141" }} />,
  },
  {
    value: 1,
    name: "Usuarios",
    path: "users",
    icon: <ManageAccountsOutlinedIcon sx={{ color: "#414141" }} />,
  },
  {
    value: 2,
    name: "Workshops",
    path: "workshops",
    icon: <SchoolOutlinedIcon sx={{ color: "#414141" }} />,
  },
  {
    value: 3,
    name: "Eventos",
    path: "events",
    icon: <EventOutlinedIcon sx={{ color: "#414141" }} />,
  },
  {
    value: 4,
    name: "Solicitudes",
    path: "requests",
    icon: <NoteAltOutlinedIcon sx={{ color: "#414141" }} />,
  },
];

const createList = [
  {
    name: "Crear workshop",
    path: "create-workshop",
    icon: <DesignServicesOutlinedIcon sx={{ color: "#414141" }} />,
  },
  {
    name: "Crear evento",
    path: "create-event",
    icon: <EditCalendarOutlinedIcon sx={{ color: "#414141" }} />,
  },
];

const DrawerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { customAlert, autoCloseAlert } = useSweetAlert();

  const handleLogoutUser = () => {
    customAlert("¿Deseas cerrar sesión?", () => {
      dispatch(logoutUser()).then(() => {
        autoCloseAlert("Sesion cerrada con exito", "success");
        navigate("/");
      });
    });
  };

  return (
    <div>
      <Divider />
      <Avatar
        alt="user profile image"
        src={user?.profileImage}
        sx={{ m: 1, width: 100, height: 100, mx: "auto" }}
      />
      <Box sx={{ mb: 2, textAlign: "center" }}>
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
      <Divider />
      <List>
        {itemsList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(text.path)}
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {createList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(text.path)}
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <List>
          <DefaultButton
            onclick={handleLogoutUser}
            styles={{ marginLeft: "auto", marginRight: 10 }}
            className="default-button-reverse"
            buttonText="Cerrar Sesión"
          />
        </List>
      </List>
    </div>
  );
};

export default DrawerList;

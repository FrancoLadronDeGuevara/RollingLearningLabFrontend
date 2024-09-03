import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert";
import { logoutUser } from "../../../redux/actions/user.actions";

const itemsList = [

  {
    value: 0,
    name: "Ir al Inicio",
    path: "/",
    icon: <HomeOutlinedIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 1,
    name: "Usuarios",
    path: "users",
    icon: <ManageAccountsOutlinedIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 2,
    name: "Workshops",
    path: "workshops",
    icon: <SchoolOutlinedIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 3,
    name: "Eventos",
    path: "events",
    icon: <EventOutlinedIcon sx={{ color: "primary.main" }} />,
  },
];

const createList = [
  {
    name: "Crear workshop",
    path: "create-workshop",
    icon: <DesignServicesOutlinedIcon sx={{ color: "success.main" }} />,
  },
  {
    name: "Crear evento",
    path: "create-event",
    icon: <EditCalendarOutlinedIcon sx={{ color: "success.main" }} />,
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

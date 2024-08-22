import {
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Box,
} from "@mui/material";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const itemsList = [
  {
    value: 0,
    name: "Usuarios",
    path: "users",
    icon: <ManageAccountsOutlinedIcon />,
  },
  {
    value: 1,
    name: "Workshops",
    path: "workshops",
    icon: <SchoolOutlinedIcon />,
  },
  {
    value: 2,
    name: "Eventos",
    path: "events",
    icon: <EventOutlinedIcon />,
  },
];

const createList = [
  {
    name: "Crear workshop",
    path: "create-workshop",
    icon: <DesignServicesOutlinedIcon />,
  },
  {
    name: "Crear evento",
    path: "create-event",
    icon: <EditCalendarOutlinedIcon />,
  },
];

const DrawerList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <Toolbar />
      <Divider />
      <Avatar
        alt="user profile image"
        src={user?.profileImage}
        sx={{ m: 1, width: 100, height: 100, mx: "auto" }}
      />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Chip
          label={user?.username}
          sx={{
            my: 2,
            color: "#fff",
            fontSize: 16,
            backgroundColor: "#d81d26",
          }}
        />
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
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>  
    </div>
  );
};

export default DrawerList;

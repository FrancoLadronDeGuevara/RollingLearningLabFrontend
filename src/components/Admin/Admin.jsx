import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DrawerList from "./DrawerList/DrawerList";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../hooks/useAlert";
import { logoutUser } from "../../redux/actions/user.actions";

const drawerWidth = 240;

const Admin = (props) => {
  const { window } = props;
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { autoCloseAlert, customAlert } = useSweetAlert();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogoutUser = () => {
    customAlert("¿Deseas cerrar sesión?", () => {
      dispatch(logoutUser()).then(() => {
        autoCloseAlert("Sesion cerrada con exito", "success");
        navigate("/")
      })
    })
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {loading && <Loader />}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "#f2f2f2",
          }}
        >
          <Toolbar>
            <IconButton
              color="#414141"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                color: "#414141",
                textAlign: "center",
                width: "100%",
                display: { xs: "none", sm: "block" },
              }}
            >
              PANEL ADMINISTRADOR
            </Typography>
            <Box sx={{ display: "flex", ml: "auto" }}>
              <Button onClick={() => navigate("/")}>
                <HomeOutlinedIcon sx={{ color: "#d81d26" }} />
              </Button>
              <Button onClick={handleLogoutUser}>
                <LogoutOutlinedIcon sx={{ color: "#d81d26" }} />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <DrawerList />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f2f2f2",
              },
            }}
            open
          >
            <DrawerList />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Admin;

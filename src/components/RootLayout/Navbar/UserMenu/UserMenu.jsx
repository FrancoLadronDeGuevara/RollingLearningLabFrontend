import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const settings = [
  {
    name: "Perfil",
    to: `/profile`,
  },
  {
    name: "Cerrar sesión",
    to: () => {},
  },
];

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleLogoutUser = () => {};
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box sx={{ ml: "auto" }}>
      <Tooltip title="Abrir menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user?.role == "admin" && (
          <NavLink
            to="/admin"
            onClick={handleCloseUserMenu}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>
              <Typography
                className="text"
                textAlign="center"
                sx={{ color: "#414141" }}
              >
                PANEL ADMIN
              </Typography>
            </MenuItem>
          </NavLink>
        )}
        {settings.map((setting, index) => (
          <NavLink
            key={index}
            onClick={
              setting.name == "Cerrar sesión" ? handleLogoutUser : handleCloseUserMenu
            }
            to={setting.to}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>
              <Typography sx={{ color: "#414141" }}>
                {setting.name.toUpperCase()}
              </Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;

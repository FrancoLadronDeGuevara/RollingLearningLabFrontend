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
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useSweetAlert from "../../../../hooks/useAlert";
import { logoutUser } from "../../../../redux/actions/user.actions";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { autoCloseAlert, customAlert } = useSweetAlert();

  const handleLogoutUser = () => {
    customAlert("¿Deseas cerrar sesión?", () => {
      dispatch(logoutUser()).then(() => {
        autoCloseAlert("Sesion cerrada con exito", "success");
        navigate("/");
      });
    });
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <>
      <Box sx={{ ml: "auto" }}>
        <Tooltip title="Abrir menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User profile image" src={user?.profileImage} />
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
              to="/admin/users"
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
          <NavLink
            onClick={handleCloseUserMenu}
            to={`/user/config`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>
              <Typography sx={{ color: "#414141" }}>PERFIL</Typography>
            </MenuItem>
          </NavLink>
          <MenuItem onClick={handleLogoutUser}>
            <Typography sx={{ color: "#414141" }}>CERRAR SESIÓN</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;

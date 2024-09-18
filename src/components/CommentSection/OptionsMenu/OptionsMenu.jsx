import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { useState } from "react";

const OptionsMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = {
    role: "admin",
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Box>
      <Tooltip title="Opciones">
        <IconButton onClick={handleOpenUserMenu}>
          <MoreVertOutlinedIcon />
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
          <MenuItem>
            <Typography
              className="text"
              textAlign="center"
              sx={{ color: "#414141" }}
            >
              Bloquear
            </Typography>
          </MenuItem>
        )}
        <MenuItem>
          <Typography sx={{ color: "#414141" }}>Editar</Typography>
        </MenuItem>
        <MenuItem>
          <Typography sx={{ color: "#414141" }}>Eliminar</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default OptionsMenu;

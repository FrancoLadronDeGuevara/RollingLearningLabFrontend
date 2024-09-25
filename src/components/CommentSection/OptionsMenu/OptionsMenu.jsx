import { Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockComment,
  blockReply,
  deleteComment,
  deleteReply,
  unblockComment,
  unblockReply,
} from "../../../redux/actions/comment.actions";
import useSweetAlert from "../../../hooks/useAlert";

const OptionsMenu = ({ isOwner, isComment, comment, reply, onEdit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { autoCloseAlert, customAlert } = useSweetAlert();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleDelete = () => {
    customAlert("¿Deseas eliminar este comentario?", () => {
      if (isComment) {
        dispatch(deleteComment(comment._id)).then(() => {
          autoCloseAlert("Comentario eliminado", "success");
        });
      } else {
        dispatch(deleteReply({ _id: comment._id, replyId: reply._id })).then(
          () => {
            autoCloseAlert("Respuesta eliminada", "success");
          }
        );
      }
    });
  };

  const handleBlockComment = () => {
    customAlert("¿Deseas bloquear este comentario?", () => {
      if (isComment) {
        dispatch(blockComment({ _id: comment._id })).then(() => {
          autoCloseAlert("Comentario bloqueado", "success");
        });
      } else {
        dispatch(blockReply({ _id: reply._id })).then(() => {
          autoCloseAlert("Respuesta bloqueada", "success");
        });
      }
    });
  };

  const handleUnblockComment = () => {
    customAlert("¿Deseas desbloquear este comentario?", () => {
      if (isComment) {
        dispatch(unblockComment({ _id: comment._id })).then(() => {
          autoCloseAlert("Comentario desbloqueado", "success");
        });
      } else {
        dispatch(unblockReply({ _id: reply._id })).then(() => {
          autoCloseAlert("Respuesta desbloqueada", "success");
        });
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Opciones">
        <MoreVertOutlinedIcon
          onClick={handleOpenUserMenu}
          sx={{ color: "gray", cursor: "pointer" }}
        />
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user?.role === "admin" && (
          <MenuItem
            onClick={
              isComment
                ? comment?.blocked
                  ? handleUnblockComment
                  : handleBlockComment
                : reply?.blocked
                ? handleUnblockComment
                : handleBlockComment
            }
          >
            <Typography sx={{ color: "#414141" }}>
              {isComment
                ? comment?.blocked
                  ? "Desbloquear"
                  : "Bloquear"
                : reply?.blocked
                ? "Desbloquear"
                : "Bloquear"}
            </Typography>
          </MenuItem>
        )}
        {isComment
          ? !comment?.blocked &&
            isOwner && (
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  onEdit();
                }}
              >
                <Typography sx={{ color: "#414141" }}>Editar</Typography>
              </MenuItem>
            )
          : !reply?.blocked &&
            isOwner && (
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  onEdit();
                }}
              >
                <Typography sx={{ color: "#414141" }}>Editar</Typography>
              </MenuItem>
            )}
        {isOwner && (
          <MenuItem onClick={handleDelete}>
            <Typography sx={{ color: "#414141" }}>Eliminar</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default OptionsMenu;

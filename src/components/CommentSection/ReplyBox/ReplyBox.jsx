import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import SendIcon from "@mui/icons-material/Send";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { likeComment } from "../../../redux/actions/like.actions";
import {
  editReply,
  getEventComments,
  getWorkshopComments,
} from "../../../redux/actions/comment.actions";
import { useState } from "react";
import useSweetAlert from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("es");

const ReplyBox = ({ reply, isLast, workshopId, eventId, comment }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { author, content, createdAt, likes, blocked } = reply;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert, customAlert } = useSweetAlert();

  const isLiked = likes?.find((like) => like === user?._id);
  const isOwner = author?._id === user?._id;
  const formattedCreatedAt = dayjs(createdAt).fromNow().replace("hace ", "");

  const handleLikeComment = () => {
    dispatch(likeComment(reply._id)).then(() => {
      if (workshopId) {
        dispatch(getWorkshopComments(workshopId));
      } else {
        dispatch(getEventComments(eventId));
      }
    });
  };

  const handleSaveEdit = () => {
    customAlert("¿Guardar cambios?", () => {
      setIsLoading(true);
      dispatch(
        editReply({
          _id: reply._id,
          content: editedContent,
        })
      )
        .then(() => {
          autoCloseAlert("Comentario editado", "success");
          setIsEditing(false);
        })
        .catch((error) => {
          autoCloseAlert(error, "error");
        })
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <>
      {blocked ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pt: 2,
            ml: 1.9,
            pl: 4,
            borderLeft: !isLast ? "1px solid #e0e0e0" : "none",
            position: "relative",
          }}
        >
          {isLast && (
            <Divider
              orientation="vertical"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "50%",
                zIndex: -1,
              }}
            />
          )}
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{ width: 32, height: 32, position: "relative", top: "50%" }}
            />
            <Divider
              sx={{ position: "absolute", width: 30, left: -32, top: 8 }}
            />
          </Box>
          <Box
            sx={{
              px: 1,
              width: "fit-content",
              my: 1,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              position: "relative",
            }}
          >
            {user?.role === "admin" && (
              <Box sx={{ position: "absolute", top: 10, right: 5 }}>
                <OptionsMenu
                  isOwner={isOwner}
                  comment={comment}
                  reply={reply}
                />
              </Box>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bolder",
                textAlign: "center",
                fontSize: { xs: 14, md: 18 },
              }}
            >
              {isOwner
                ? "Tu respuesta ha sido bloqueada"
                : "Repuesta bloqueada"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "gray",
                textAlign: "center",
                fontStyle: "italic",
                fontSize: { xs: 12, md: 16 },
              }}
            >
              Esta respuesta ha sido bloqueada porque infringe las normas de la
              comunidad
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pt: 2,
            ml: 1.9,
            pl: 4,
            borderLeft: !isLast ? "1px solid #e0e0e0" : "none",
            position: "relative",
          }}
        >
          {isLast && (
            <Divider
              orientation="vertical"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "50%",
                zIndex: -1,
              }}
            />
          )}
          <Box sx={{ position: "relative" }}>
            <Divider
              sx={{ position: "absolute", width: 30, left: -32, top: 8 }}
            />
            <Avatar
              onClick={() => navigate(`/user-profile/${author?._id}`)}
              src={author?.profileImage}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              "::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: -10,
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "10px 10px 10px 0",
                borderColor: "transparent #f5f5f5 transparent transparent",
              },
            }}
          />
          <Box
            sx={{
              px: 1,
              width: isEditing ? { xs: "100%", sm: "50%" } : "fit-content",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: "bolder", fontSize: 14 }}>
                  {author?.username}
                </Typography>
              </Box>
              {user?.role === "admin" || isOwner ? (
                <OptionsMenu
                  isOwner={isOwner}
                  isComment={false}
                  comment={comment}
                  reply={reply}
                  onEdit={() => setIsEditing(true)}
                />
              ) : null}
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                maxRows={4}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                sx={{ mt: 1, mb: 1 }}
                inputProps={{ maxLength: 300 }}
              />
            ) : (
              <Box>
                <Typography
                  variant="body1"
                  sx={{ color: "#414141", overflowWrap: "anywhere" }}
                >
                  {content}
                </Typography>
              </Box>
            )}

            {isEditing && (
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setEditedContent(content);
                    setIsEditing(false);
                  }}
                  disabled={!comment || isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSaveEdit}
                  disabled={!comment || !editedContent || isLoading}
                  endIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SendIcon />
                    )
                  }
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </Button>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontSize: 12 }}
                >
                  {formattedCreatedAt}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isLiked ? "#1976d2" : "gray",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    fontSize: 12,
                    ":hover": { textDecoration: "underline" },
                  }}
                  onClick={handleLikeComment}
                >
                  Me gusta
                </Typography>
              </Box>
              {likes?.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontSize: 12, mr: 0.5 }}
                  >
                    {likes.length}
                  </Typography>
                  <RecommendOutlinedIcon
                    sx={{ color: "#1976d2", fontSize: 20 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ReplyBox;

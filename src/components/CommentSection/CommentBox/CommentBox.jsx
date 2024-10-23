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
import { likeComment } from "../../../redux/actions/like.actions";
import {
  editComment,
  getEventComments,
  getWorkshopComments,
} from "../../../redux/actions/comment.actions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import { useState } from "react";
import NewReply from "../NewReply/NewReply";
import ReplyBox from "../ReplyBox/ReplyBox";
import useSweetAlert from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CommentBox = ({ comment }) => {
  const { author, blocked, content, createdAt, likes, replies, workshop } =
    comment;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [replyOpen, setReplyOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert, customAlert } = useSweetAlert();

  const isLiked = likes?.find((like) => like === user?._id);
  const isOwner = author?._id === user?._id;
  const formattedCreatedAt = dayjs(createdAt).fromNow().replace("hace ", "");
  const handleLikeComment = () => {
    dispatch(likeComment(comment._id)).then(() => {
      if (workshop) {
        dispatch(getWorkshopComments(comment.workshop));
      } else {
        dispatch(getEventComments(comment.event));
      }
    });
  };
  const handleSaveEdit = () => {
    customAlert("¿Guardar cambios?", () => {
      setIsLoading(true);
      dispatch(editComment({ _id: comment._id, content: editedContent }))
        .then(() => {
          autoCloseAlert("Comentario editado", "success");
          setIsEditing(false);
        })
        .catch((error) => {
          autoCloseAlert(error.message, "error");
        })
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <>
      {blocked ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{ width: 32, height: 32, position: "relative", top: "50%" }}
            />
            {replies.length > 0 && (
              <Divider
                orientation="vertical"
                sx={{
                  top: "100%",
                  height: "120%",
                  position: "absolute",
                  left: 15,
                }}
              />
            )}
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
                  isComment
                  comment={comment}
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
              {isOwner ? "Tu comentario ha sido bloqueado" : "Comentario bloqueado"}
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
              Este comentario ha sido bloqueado porque infringe las normas de la
              comunidad
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1, mt: 5 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              onClick={ () => navigate(`/user-profile/${author?._id}`)}
              src={author?.profileImage}
              sx={{ width: 32, height: 32, position: "relative", top: "50%", cursor: "pointer" }}
            />
            {replies.length > 0 && (
              <Divider
                orientation="vertical"
                sx={{
                  top: "50%",
                  height: "50%",
                  position: "absolute",
                  left: 15,
                  zIndex: -1,
                }}
              />
            )}
            {replies.length === 0 && replyOpen && (
              <Divider
                orientation="vertical"
                sx={{
                  top: "50%",
                  height: "50%",
                  position: "absolute",
                  left: 15,
                  zIndex: -1,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              position: "relative",
              "::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
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
                  isComment
                  comment={comment}
                  onEdit={() => setIsEditing(true)}
                />
              ) : null}
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
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
                <Typography
                  variant="body2"
                  onClick={() => setReplyOpen(!replyOpen)}
                  sx={{
                    color: "gray",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    fontSize: 12,
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  Responder
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
      {replyOpen && (
        <NewReply
          showReply={replyOpen}
          commentId={comment._id}
          closeReply={() => setReplyOpen(false)}
          hasReplies={replies?.length > 0}
        />
      )}
      {replies?.length > 0 &&
        replies.map((reply, index) => (
          <ReplyBox
            key={reply._id}
            reply={reply}
            workshopId={comment.workshop}
            eventId={comment.event}
            comment={comment}
            isLast={index === replies.length - 1}
          />
        ))}
    </>
  );
};

export default CommentBox;

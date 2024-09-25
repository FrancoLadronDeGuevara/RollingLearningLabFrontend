import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useSweetAlert from "../../../hooks/useAlert";
import { replyComment } from "../../../redux/actions/comment.actions";

const NewReply = ({ showReply, commentId, closeReply, hasReplies }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert } = useSweetAlert();

  const handleSubmit = () => {
    setIsLoading(true);

    if (!reply) {
      setIsLoading(false);
      return autoCloseAlert("Debes escribir una respuesta", "error");
    }

    dispatch(replyComment({ content: reply, _id: commentId }))
      .then(() => {
        setReply("");
        autoCloseAlert("Respuesta enviada", "success");
        closeReply();
      })
      .catch((error) => {
        autoCloseAlert(error.message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: showReply ? "flex" : "none",
        backgroundColor: "#fff",
        justifyContent: "start",
        pl: 1.9,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          position: "relative",
          pl: 4,
          borderLeft: hasReplies ? "1px solid #e0e0e0" : "none",
        }}
      >
        <Box sx={{ position: "relative" }}>
        {!hasReplies && (
            <Divider
              orientation="vertical"
              sx={{
                position: "absolute",
                left: -32,
                top: 0,
                height: 20,
              }}
            />
          )}
          <Divider
            sx={{ position: "absolute", width: 30, left: -32, top: 20 }}
          />
          <Avatar
            src={user?.profileImage}
            sx={{ width: 32, height: 32, mt: 1 }}
          />
        </Box>
        <Box sx={{ p: 1, width: { xs: 200, sm: "100%" } }}>
          <FormControl fullWidth sx={{ borderRadius: 1 }}>
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              multiline
              size="small"
              value={reply}
              maxRows={4}
              onChange={(e) => setReply(e.target.value)}
              variant="outlined"
              placeholder="Escribe una respuesta..."
              inputProps={{ maxLength: 300 }}
            />
            <Box sx={{ display: "flex", justifyContent: "end", my: 1, gap: 1 }}>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => {
                  setReply("");
                  closeReply();
                }}
                disabled={!reply || isLoading}
                sx={{ width: 100 }}
              >
                Cancelar
              </Button>
              <Button
                sx={{ width: 120 }}
                size="small"
                variant="contained"
                onClick={handleSubmit}
                disabled={!reply || isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SendIcon />
                  )
                }
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default NewReply;

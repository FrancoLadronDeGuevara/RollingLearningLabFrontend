import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert";
import {
  createEventComment,
  createWorkshopComment,
  getWorkshopComments,
} from "../../../redux/actions/comment.actions";
import { useParams } from "react-router-dom";

const NewComment = ({ isWorkshop }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { autoCloseAlert } = useSweetAlert();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!comment || comment.trim() === "") {
      setIsLoading(false);
      return autoCloseAlert("No puedes enviar un comentario vacío", "error");
    }

    if (isWorkshop) {
      dispatch(createWorkshopComment({ content: comment, _id: id }))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setComment("");
          autoCloseAlert("Comentario enviado", "success");
          dispatch(getWorkshopComments(id));
        })
        .catch((error) => {
          setIsLoading(false);
          autoCloseAlert(error.message, "error");
        })
        .finally(() => setIsLoading(false));
    } else {
      dispatch(createEventComment({ content: comment, _id: id }))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setComment("");
          autoCloseAlert("Comentario enviado", "success");
        })
        .catch((error) => {
          setIsLoading(false);
          autoCloseAlert(error.message, "error");
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ my: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Avatar src={user?.profileImage} />
        <Box sx={{ width: 600 }}>
          <FormControl fullWidth sx={{ borderRadius: 1 }}>
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              placeholder="Escribe un comentario..."
              inputProps={{ maxLength: 300 }}
            />
            <Box sx={{ display: "flex", justifyContent: "end", my: 1, gap: 1 }}>
              <Button
                color="error"
                variant="contained"
                onClick={() => setComment("")}
                disabled={!comment || isLoading}
                sx={{ width: 100 }}
              >
                Cancelar
              </Button>
              <Button
                sx={{ width: 120 }}
                variant="contained"
                onClick={handleSubmit}
                disabled={!comment || isLoading}
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

export default NewComment;

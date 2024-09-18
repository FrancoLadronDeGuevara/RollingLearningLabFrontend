import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "../../../hooks/useAlert"; 
import { createEventComment, createWorkshopComment } from "../../../redux/actions/comment.actions"; 


const NewComment = ({isWorkshop}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {autoCloseAlert} = useSweetAlert();

  const handleSubmit = async() => {
    setIsLoading(true);

    if(!comment){
      setIsLoading(false);
      return autoCloseAlert("Debes escribir un comentario", "error");
    }
    
    if(isWorkshop){
      dispatch(createWorkshopComment({comment, workshop: isWorkshop._id}))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setComment("");
          autoCloseAlert("Comentario enviado", "success");
        })
        .catch((error) => {
          setIsLoading(false);
          autoCloseAlert(error.message, "error");
        });
    }else{
      dispatch(createEventComment({comment, event: isWorkshop._id}))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          setComment("");
          autoCloseAlert("Comentario enviado", "success");
        })
        .catch((error) => {
          setIsLoading(false);
          autoCloseAlert(error.message, "error");
        });
    }
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ my: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Avatar src={user?.profileImage} />
        <Box component={Paper} elevation={0} sx={{ width: 600 }}>
          <FormControl
            fullWidth
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
          >
            <TextField
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              multiline
              maxRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              placeholder="Escribe un comentario..."
            />
            <Button
              sx={{ width: 120, ml: "auto" }}
              variant="contained"
              onClick={handleSubmit}
              disabled={!comment || isLoading}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default NewComment;

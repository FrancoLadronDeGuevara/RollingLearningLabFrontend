import { Box, Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment/NewComment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventComments,
  getWorkshopComments,
} from "../../redux/actions/comment.actions";
import CommentBox from "./CommentBox/CommentBox";

const CommentSection = ({ isWorkshop }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { workshopComments, eventComments } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    if (isWorkshop) {
      dispatch(getWorkshopComments(id));
    } else {
      dispatch(getEventComments(id));
    }
  }, []);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        px: 2,
      }}
    >
      <Typography variant="h4" component={"h2"} sx={{ my: 2 }}>
        Comentarios (
        {isWorkshop
          ? workshopComments.reduce(
              (acc, comment) => acc + 1 + (comment.replies?.length || 0),
              0
            )
          : eventComments.reduce(
              (acc, comment) => acc + 1 + (comment.replies?.length || 0),
              0
            )}
        )
      </Typography>

      <Divider sx={{ my: 1 }} />
      <Box>
        {isWorkshop ? (
          workshopComments?.map((comment) => (
            <CommentBox key={comment._id} comment={comment} />
          ))
        ) : eventComments?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              component={"h3"}
              sx={{ color: "gray", fontStyle: "italic" }}
            >
              No hay comentarios aún
            </Typography>
          </Box>
        ) : (
          eventComments.map((comment) => (
            <CommentBox key={comment._id} comment={comment} />
          ))
        )}
        <NewComment isWorkshop={isWorkshop} />
      </Box>
    </Container>
  );
};

export default CommentSection;

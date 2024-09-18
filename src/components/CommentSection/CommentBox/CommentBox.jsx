import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import { Link } from "react-router-dom";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

const CommentBox = ({ comment }) => {
  const {
    author,
    blocked,
    content,
    createdAt,
    updatedAt,
    likes,
    resplies,
    workshop,
    event,
  } = comment;
  return (
    <>
      {blocked ? (
        <Box
          component={Paper}
          elevation={5}
          sx={{ px: 1, maxWidth: 600, ml: 6, my: 2, p: 2 }}
        >
          <Typography variant="h6" textAlign="center">
            Comentario bloqueado
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "gray", textAlign: "center", fontStyle: "italic" }}
          >
            Este comentario ha sido bloqueado porque infringe las normas de la
            comunidad
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1, my: 2 }}>
          <Avatar src={author?.profileImage} />
          <Box component={Paper} elevation={5} sx={{ px: 1, width: 600 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "bolder",
                    fontFamily: "sans-serif",
                    color: "#1976d2",
                  }}
                >
                  {author?.username}
                </Link>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontStyle: "italic" }}
                >
                  Hace 10 minutos
                </Typography>
              </Box>
              <Box>
                <OptionsMenu />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
              <Typography variant="body2" sx={{ color: "gray" }}>
                {content}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  Me gusta
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  Responder
                </Typography>
              </Box>
              {likes?.length > 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontWeight: "bolder" }}
                  >
                    {likes.length}
                  </Typography>
                  <RecommendOutlinedIcon />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CommentBox;

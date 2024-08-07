import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, AvatarGroup, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

export function CardWorkshop({ data }) {
  const color = grey[100];

  return (
    <Grid container spacing={{ xs: 2, lg: 4 }} padding={{ xs: 2, sm: 3 }}>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Card sx={{ width: "auto", background:color }}>
            <CardMedia
              component="img"
              alt={data.title}
              height="140"
              image={item.imagen}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                by: {item.speaker}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <AvatarGroup total={20}>
                <Avatar alt="Remy Sharp" src={item.imagen} />
                <Avatar alt="Remy Sharp" src={item.imagen} />
                <Avatar alt="Remy Sharp" src={item.imagen} />
              </AvatarGroup>
              <Button size="small">
                <Link to={`#`} style={{ textDecoration: "none" }}>
                  Leer más
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

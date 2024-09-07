import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

const FavoritesCard = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia component="img" src={item.imageBanner} alt={item.imageBanner} sx={{ width: 200 }} />
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h5" textAlign="center">
          {item.title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Chip label={item.date} sx={{mr: 1}}/>
          <Chip label={`${item.startTime} - ${item.endTime}`} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FavoritesCard;

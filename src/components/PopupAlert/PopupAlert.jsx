import { Alert, Snackbar, Slide  } from "@mui/material";

const PopupAlert = ({ open, onClose, message, color }) => {
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      key={"bottom" + "center"}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "left" }}
      
    >
      <Alert
        onClose={onClose}
        severity={color}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopupAlert;

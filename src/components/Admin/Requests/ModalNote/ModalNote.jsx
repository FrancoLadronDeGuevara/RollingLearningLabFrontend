import { Box, Modal, Typography } from "@mui/material"
import { modalStyle } from "../../../../helpers/styles"


const ModalNote = ({ open, handleClose, note, user }) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nota de {user.username} : 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {note}
          </Typography>
        </Box>
      </Modal>
  )
}

export default ModalNote
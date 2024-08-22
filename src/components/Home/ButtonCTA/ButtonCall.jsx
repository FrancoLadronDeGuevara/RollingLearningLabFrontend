import { Button } from "@mui/material"

export const ButtonCall = ({textButton}) => {
  return (
    <Button
    variant="contained"
    size="small"
    color="error"
    sx={{ borderRadius: "1rem", padding: ".5rem 1rem" }}
  >
    {textButton}
  </Button>
  )
}

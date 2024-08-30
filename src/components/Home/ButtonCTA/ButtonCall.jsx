import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const ButtonCall = ({textButton, linkTo ="/"}) => {
  return (
    <Button
    variant="contained"
    size="small"
    color="error"
    sx={{ borderRadius: "1rem", padding: ".5rem 1rem" }}
  >
   <Link to={linkTo} style={{textDecoration:"none", color:"#fff"}}>
   {textButton}
   </Link>
  </Button>
  )
}

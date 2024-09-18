import { Visibility, VisibilityOff } from "@mui/icons-material"
import { confIcon } from "../../helpers/styles"


const ShowOrHidePassword = ({ password, setter }) => {
  return (
    <>
    {password ? (
        <VisibilityOff
        sx={confIcon}
        onClick={() => setter(false)}
        />
    ) : (
        <Visibility
        sx={confIcon}
        onClick={() => setter(true)}
        />
    )}
    </>
  )
}

export default ShowOrHidePassword
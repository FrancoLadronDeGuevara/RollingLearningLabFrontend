import { Box, Typography } from "@mui/material";

export const SectionAbout = () => {
  const sectionStyle = {
		display: "grid",
    backgroundColor: "#2f2f2f",
    color: "#fff",
		gridTemplateColumns: "1fr",
    height: {xs:"auto", md:"80vh"},
		placeContent:"center"
  };
  return (
    <Box sx={sectionStyle}>
      <Box
        sx={{
					margin:"0 auto",
          textAlign: {xs:"start",sm:"center"},
          padding: "1.5rem",
					width:{xs:"100%",sm:"60vw"}
        }}
      >
        <Typography variant="subtitle1" component="h2" sx={{fontWeight:"600", marginBlock:"1rem"}}>
          ¿Quienes somos?
        </Typography>
        <Typography
          sx={{
						fontSize:{xs:"1.5rem", sm:"1.8rem", md:"2rem"},
            fontWeight: "500",
            lineHeight: {xs:"2rem", md:"2.5rem"},
          }}
        >
          Somos un grupo de desarrolladores full stack apasionados por la
          tecnología y el aprendizaje continuo. Actualmente, estamos trabajando
          en nuestro proyecto final para el curso de React Avanzado, donde
          aplicamos todo lo aprendido para crear soluciones innovadoras y
          escalables.
        </Typography>
      </Box>
    </Box>
  );
};

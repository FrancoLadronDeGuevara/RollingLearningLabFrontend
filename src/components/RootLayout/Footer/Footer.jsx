import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import logoRollingCode from "../../../assets/images/logoRolling.webp";
import DefaultButton from "../../DefaultButton/DefaultButton";
import { listLinksFooter } from "../../../helpers/linksFooter";

const Footer = () => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <Container
      id="contact-section"
      maxWidth={false}
      sx={{ backgroundColor: "#2f2f2f", color: "white" }}
    >
      <Grid
        container
        maxWidth="lg"
        sx={{
          pt: 4,
          mx: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            mt: { xs: 2, sm: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{ width: { xs: 250, sm: 200 }, filter: "invert(100%)" }}
            src={logoRollingCode}
            alt="Logo RollingCode School Learning Lab"
          />

          <DefaultButton
            buttonText="TRABAJÁ CON NOSOTROS"
            className="default-button-reverse"
            styles={{
              marginTop: "48px",
            }}
            onclick={() =>
              window.open(
                "https://web.rollingcodeschool.com/trabaja-con-nosotros/",
                "_blank"
              )
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{ my: { xs: 4, sm: 0 }, mx: "auto", px: 2, display: {xs: "none", sm: "block"} }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {listLinksFooter.slice(0, 3).map((link, index) => (
                <Typography variant="subtitle2" key={index}>
                  <a href={link.url} target="_blank" style={linkStyle}>
                    {link.title}
                  </a>
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {listLinksFooter.slice(3, 6).map((link, index) => (
                <Typography variant="subtitle2" key={index}>
                  <a href={link.url} target="_blank" style={linkStyle}>
                    {link.title}
                  </a>
                </Typography>
              ))}
            </Box>
          </Box>
          <Divider sx={{ backgroundColor: "#b6b6b6", my: 5 }} />
          <Box sx={{ display: "flex", mt: 2, mb: 5, alignItems: "center" }}>
            <ArrowCircleRightOutlinedIcon
              sx={{ color: "white", fontSize: 40, mr: 2 }}
            />
            <Typography variant="subtitle2">
              <a
                href="https://web.rollingcodeschool.com/tos-becas/"
                style={{ color: "white" }}
                target="_blank"
              >
                Términos y condiciones para Becas
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mt: { xs: 8, sm: 0 } }}>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "left"} }}>
            academy@rollingcodeschool.com
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "left"} }}>+54 381 578-3030</Typography>
          <Typography variant="subtitle2" sx={{ mt: 3, textAlign: {xs: "center", sm: "left"} }}>
            Av. General Paz 576,
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "left"} }}>Piso 9, oficina 2</Typography>
          <Typography variant="subtitle2" sx={{ textAlign: {xs: "center", sm: "left"} }}>
            San Miguel de Tucumán, Argentina
          </Typography>

          <Box sx={{ mt: 3, mb: {xs: 1, sm: 5} }}>
            {listLinksFooter.slice(6).map((link, index) => (
              <Typography variant="subtitle2" key={index}>
                <a href={link.url} target="_blank" style={{ color: "white" }}>
                  {link.title}
                </a>
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: "white", my: 2 }} />
      <Box
        maxWidth="lg"
        sx={{
          textAlign: "center",
          mx: "auto",
          pb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "left", color: "#b6b6b6" }}
        >
          RollingCode ® 2024
        </Typography>
        <a
          href="https://web.rollingcodeschool.com/terminos-y-condiciones/"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
        >
          <Typography variant="body1">Terminos y Condiciones</Typography>
        </a>
      </Box>
    </Container>
  );
};

export default Footer;

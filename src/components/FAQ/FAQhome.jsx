import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import FloatingChatButton from "../FAQ/FloatingChatButton";

const faqs = [
  {
    question: "¿Puedo inscribirme a un workshop sin registrarme?",
    answer:
      "No. Es necesario crearse una cuenta para poder acceder a los distintos workshops y poder inscribirse.",
  },
  {
    question:
      "¿Cuál es el precio de un workshop y los medios de pago que aceptan?",
    answer:
      "Los precios varían dependiendo el workshop, ingresando en la sección workshops puede encontrar toda la info. de cada uno.",
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos efectivo, transferencia, débito y tarjeta de crédito. Pagando en efectivo tiene un 15% de descuento.",
  },
  {
    question: "¿Dónde puedo cambiar mi nombre de perfil y mi contraseña?",
    answer:
      "Haciendo click en 'mi perfil' arriba a la derecha, luego ingresando a 'Opciones de usuario' y luego a 'configuración' podrás modificar todos tus datos personales.",
  },
  {
    question: "¿Me darán certificado una vez finalizado el workshop o evento?",
    answer:
      "Sí claro, una vez finalizado el workshop o evento se te otorgará un certificado el cual podrás visualizarlo en tu perfil en 'workshops completados' o en 'eventos completados'. También lo estaremos enviaremos a tu casilla de correo electrónico.",
  },
  {
    question: "¿Qué hago si olvidé mi contraseña y no puedo ingresar?",
    answer:
      "Puedes restablecer tu contraseña antes de iniciar sesión haciendo click donde dice 'Olvidé mi contraseña', se te pedirá el correo con el que te registraste y se te mandará por ahí un enlace para restablecer tu contraseña.",
  },
  {
    question: "Me gustaría trabajar para RollingCode, ¿Cómo puedo hacer?",
    answer:
      "Puedes dirigirte al pié de esta página y vas a encontrar un botón que dice 'Trabajá con nosotros', luego completá con tus datos y analizaremos tu perfil. Si coincide con alguna de nuestras búsquedas laborales nos pondremos en contacto vos!.",
  },
  {
    question: "¿Puedo asistir a los workshops o eventos de manera presencial?",
    answer:
      "Si, para poder asistir a los distintos eventos de forma presencial primero debes registrarte y elegir la opción de hacerlo de forma presencial en nuestro site, esto es necesario ya que hay un cupo limitado.",
  },
  {
    question:
      "¿Para qué sirve la función de speaker y cómo puedo acceder a la misma?",
    answer:
      "Convertirte en speaker te permitirá compartir tus conocimientos y experiencias con la comunidad. Tendrás la oportunidad de crear workshops únicos que ayudarán a otros usuarios a aprender y crecer. Podrás crear workshops que se activarán una vez que un administrador los apruebe, garantizando la calidad y relevancia del contenido para la comunidad.",
  },
];


const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");


const StyledTextField = styled(TextField)({
  borderRadius: "30px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6C63FF",
    },
    "&:hover fieldset": {
      borderColor: "#7f78ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6C63FF",
    },
  },
});

const StyledAccordion = styled(Accordion)({
  marginBottom: "5px",
});

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: "0 16px", 
});

const QuestionText = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
});

const SearchContainer = styled("div")({
  backgroundImage:
    "url('https://cdn.pixabay.com/photo/2016/11/30/12/16/question-mark-1872665_1280.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "50px 0",
});

const AnswerText = styled(Typography)({
  fontSize: "0.9rem",
});

const TitleText = styled(Typography)({
  color: "#ffff",
  fontWeight: "bold",
  fontSize: "2rem",
});

export const FAQhome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqs.filter((faq) =>
    removeAccents(faq.question.toLowerCase()).includes(
      removeAccents(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <SearchContainer>
        <Container maxWidth="lg" style={{ padding: "0" }}>
          <TitleText align="center">Preguntas frecuentes</TitleText>
          <StyledTextField
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              marginTop: "60px",
              backgroundColor: "#fff",
              border: "none", 
              borderRadius: "30px", 
              maxWidth: "45vw", 
              width: "100%",
              margin: "0 auto", 
              display: "block", 
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", 
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none", 
                },
              },
            }}
          />
        </Container>
      </SearchContainer>

      <Container maxWidth="lg" style={{ padding: "0" }}>
        <Grid container spacing={2} style={{ marginTop: 1, marginBottom: 50 }}>
          {filteredFaqs.map((faq, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <StyledAccordion
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <QuestionText>{faq.question}</QuestionText>
                </StyledAccordionSummary>
                <AccordionDetails>
                  <AnswerText>{faq.answer}</AnswerText>
                </AccordionDetails>
              </StyledAccordion>
            </Grid>
          ))}
        </Grid>
      </Container>
      <FloatingChatButton />
    </>
  );
};
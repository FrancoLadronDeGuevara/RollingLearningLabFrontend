import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/system";

const FloatingButton = styled("a")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#25D366",
  color: "#fff",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#22b359",
  },
});

const FloatingChatButton = () => {
  return (
    <FloatingButton
      href="https://wa.me/+5493815783030"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon style={{ fontSize: "36px" }} />
    </FloatingButton>
  );
};

export default FloatingChatButton;
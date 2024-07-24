import "./Navbar.css";

import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logoRollingCode from "../../../assets/images/logoRolling.webp";

import DefaultButton from "../../DefaultButton/DefaultButton";
import HamburguerMenu from "./HamburguerMenu/HamburguerMenu";
import UserMenu from "./UserMenu/UserMenu";

import { pages } from "../../../helpers/pagesNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  return (
    <AppBar
      position="sticky"
      sx={{ top: 0, backgroundColor: "white", color: "black" }}
    >
      <Container maxWidth="xl" sx={{ px: 1 }}>
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logoRollingCode}
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              width: 150,
              cursor: "pointer",
            }}
          />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <HamburguerMenu/>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, mx: "auto" }}>
            {pages.map((page, indexPage) => (
              <Typography
                key={indexPage}
                className="underline-animation"
                variant="h6"
                sx={{
                  m: 2,
                  color: "#414141",
                  display: "block",
                  textTransform: "uppercase",
                }}
                onClick={() => navigate(page.path)}
              >
                <Link
                  to={page.path}
                  style={{ textDecoration: "none", color: "#333333" }}
                >
                  {page.name}
                </Link>
              </Typography>
            ))}
          </Box>

          {isAuthenticated && !loading && <UserMenu />}

          {!isAuthenticated && (
            <Box sx={{ display: "flex", ml: "auto" }}>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <DefaultButton buttonText="INICIAR SESION" />
              </NavLink>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <NavLink
                  style={{ textDecoration: "none", marginLeft: "8px" }}
                  to="/register"
                >
                  <DefaultButton
                    buttonText="REGISTRARSE"
                    className="default-button-reverse"
                  />
                </NavLink>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

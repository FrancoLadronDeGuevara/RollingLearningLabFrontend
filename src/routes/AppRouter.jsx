import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage, LoginPage, NotFoundPage, RegisterPage, WorkshopPage } from "../pages/index";
import RootLayout from "../components/RootLayout/RootLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/workshops" element={<WorkshopPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

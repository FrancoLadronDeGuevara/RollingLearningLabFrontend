import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  WorkshopPage,
  VerifyUserEmailPage,
  AdminPage,
  Users,
} from "../pages/index";
import RootLayout from "../components/RootLayout/RootLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <HomePage />
            </RootLayout>
          }
        />

        <Route
          path="/workshops"
          element={
            <RootLayout>
              <WorkshopPage />
            </RootLayout>
          }
        />
        <Route
          path="/verify-user/:id"
          element={
            <RootLayout>
              <VerifyUserEmailPage />
            </RootLayout>
          }
        />
        <Route
          path="*"
          element={
            <RootLayout>
              <NotFoundPage />
            </RootLayout>
          }
        />

        <Route path="/admin/*" element={<AdminPage />}>
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

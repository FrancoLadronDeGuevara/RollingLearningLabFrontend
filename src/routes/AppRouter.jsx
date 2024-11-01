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
  Workshops,
  CreateWorkshop,
  Events,
  CreateEvent,
  EditWorkshop,
  EditEvent,
  Requests,
  SpeakerRequestForm,
  WorkshopDetailPage,
  UserPage,
  UserConfig,
  UserProfilePage,
  FavoritesWorkshops,
  CompletedWorkshops,
  RegisteredWorkshops,
  FavoritesEvents,
  CreatedWorkshops,
  CreateWorkshopBySpeaker,
  FAQpage,
} from "../pages/index";

import RootLayout from "../components/RootLayout/RootLayout";
import { EventDetailPage } from "../pages/EventDetailPage";

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
          path="/workshops-list"
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
        <Route
          path="/FAQ"
          element={
            <RootLayout>
              <FAQpage />
            </RootLayout>
          }
        />

        <Route
          path="/workshop/:id"
          element={
            <RootLayout>
              <WorkshopDetailPage />
            </RootLayout>
          }
        />

        <Route
          path="/event/:id"
          element={
            <RootLayout>
              <EventDetailPage />
            </RootLayout>
          }
        />
        <Route
          path="/user-profile/:id"
          element={
            <RootLayout>
              <UserProfilePage />
            </RootLayout>
          }
        />

        <Route path="/admin/*" element={<AdminPage />}>
          <Route path="users" element={<Users />} />
          <Route path="workshops" element={<Workshops />} />
          <Route
            path="workshops/edit-workshop/:id"
            element={<EditWorkshop />}
          />
          <Route
            path="workshops/create-workshop/:id"
            element={<CreateWorkshop />}
          />
          <Route path="create-workshop" element={<CreateWorkshop />} />
          <Route path="events" element={<Events />} />
          <Route path="events/edit-event/:id" element={<EditEvent />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="requests" element={<Requests />} />
          <Route path="events/create-event" element={<CreateEvent />} />
        </Route>

        <Route path="/user/*" element={<UserPage />}>
          <Route path="config" element={<UserConfig />} />
          <Route path="create-workshop" element={<CreateWorkshopBySpeaker />} />
          <Route path="speaker-request" element={<SpeakerRequestForm />} />
          <Route path="workshops/favorites" element={<FavoritesWorkshops />} />
          <Route path="workshops/completed" element={<CompletedWorkshops />} />
          <Route path="workshops/created" element={<CreatedWorkshops />} />
          <Route
            path="workshops/registered"
            element={<RegisteredWorkshops />}
          />
          <Route path="events/favorites" element={<FavoritesEvents />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

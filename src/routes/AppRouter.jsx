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
  DetailsUser,
  UserPage,
  UserConfig,
  UserInfo,
  // UserWorkshops,
  // NextWorkshop,
  // FavWorkshop,
  // CompletedWorkshop,

  // UserEvents,
  // NextEvent,
  // FavEvent,
  // CompletedEvent,
  // ChangeToSpeaker,
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
          <Route path="users/user/:id" element={<DetailsUser />} />
          <Route path="workshops" element={<Workshops />} />
          <Route
            path="workshops/edit-workshop/:id"
            element={<EditWorkshop />}
          />
          <Route
            path="workshops/create-workshop/:id"
            element={<CreateWorkshop />}
          />
          <Route path="events" element={<Events />} />
          <Route path="events/create-event" element={<CreateEvent />} />
        </Route>

        <Route path="/user/*" element={<UserPage />}>
          <Route path="info" element={<UserInfo />} />
          <Route path="config" element={<UserConfig />} />
          {/* <Route path="user-workshops" element={<UserWorkshops />} />
          <Route
            path="user-workshops/next-workshop"
            element={<NextWorkshop />}
          />
          <Route path="user-workshops/fav-workshop" element={<FavWorkshop />} />
          <Route
            path="user-workshops/completed-workshop"
            element={<CompletedWorkshop />}
          />
          <Route path="user-events" element={<UserEvents />} />
          <Route path="user-events/next-event" element={<NextEvent />} />
          <Route path="user-events/fav-event" element={<FavEvent />} />
          <Route
            path="user-events/completed-event"
            element={<CompletedEvent />}
          />*/}
          {/* <Route
            path="user-config/change-to-speaker"
            element={<ChangeToSpeaker />}
          /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};


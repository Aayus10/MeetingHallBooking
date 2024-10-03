import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./redux/store.js";
import HomePage from "./components/homepage/Home.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import UserHome from "./components/dashboard/UserHome.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import { PersistGate } from "redux-persist/integration/react";
import BookingForm from "./components/dashboard/BookingForm.jsx";
import ValidationPage from "./components/admin/ValidationPage.jsx";
import HallComponent from "./components/dashboard/HallComponent.jsx";
import Notifications from "./components/dashboard/Notifications.jsx";
import ProtectedRoute from "./components/homepage/ProtectedRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MeetingHallCalendar from "./components/dashboard/BookStatus.jsx";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/hallslist",
    element: (
      <ProtectedRoute>
        <HallComponent />
      </ProtectedRoute>
    ),
  },

  {
    path: "/bookingform",
    element: (
      <ProtectedRoute>
        <BookingForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminhome",
    element: (
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userhome",
    element: (
      <ProtectedRoute>
        <UserHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookstatus",
    element: (
      <ProtectedRoute>
        <MeetingHallCalendar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/validatebooking",
    element: (
      <ProtectedRoute>
        <ValidationPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </RouterProvider>
      </Provider>
    </MantineProvider>
  </StrictMode>
);

import { ThemeProvider } from "@emotion/react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import theme from "./theme";
import Layout from "./components/Layout";
import ScheduleTable from "./routes/ScheduleTable";
import PartyInfo from "./routes/PartyInfo";
import Modals from "./components/Modals";

const router = createBrowserRouter([
  {
    path: "/loa_scheduler",
    element: <Layout />,
    children: [
      {
        path: "/loa_scheduler/",
        element: <Navigate to="/loa_scheduler/schedule" />,
      },
      {
        path: "/loa_scheduler/schedule",
        element: <ScheduleTable />,
      },
      {
        path: "/loa_scheduler/party",
        element: <PartyInfo />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Modals />
    </ThemeProvider>
  );
}

export default App;

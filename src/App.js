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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/schedule" />,
      },
      {
        path: "/schedule",
        element: <ScheduleTable />,
      },
      {
        path: "/party",
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

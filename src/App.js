import { ThemeProvider } from "@emotion/react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import theme from "./theme";
import Layout from "./components/Layout";
import ScheduleTable from "./routes/ScheduleTable";
import PartyInfo from "./routes/PartyInfo";
import Modals from "./components/Modals";
import MobileProvider from "./provider/MobileProvider";

function App() {
  return (
    <MobileProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            {/* /loa_scheduler/ 경로에 대한 리다이렉션 설정 */}
            <Route
              path="/"
              element={<Navigate to="/schedule" replace />} // Navigate 대신에 Redirect를 사용할 수도 있습니다.
            />
            {/* 나머지 경로 설정 */}
            <Route path="/*" element={<Layout />}>
              <Route path="schedule" element={<ScheduleTable />} />
              <Route path="party" element={<PartyInfo />} />
            </Route>
          </Routes>
        </Router>

        <Modals />
      </ThemeProvider>
    </MobileProvider>
  );
}

export default App;

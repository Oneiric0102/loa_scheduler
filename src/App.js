import { useState } from "react";
import "./App.css";
import HeaderButton from "./component/HeaderButton";
import WeeklyTable from "./component/WeeklyTable";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isToday, setIsToday] = useState(true);
  return (
    <div className="container">
      <div className="header">
        <HeaderButton />
        <HeaderButton />
      </div>
      <div className="body">
        <WeeklyTable />
        {"test"}
      </div>
    </div>
  );
}

export default App;

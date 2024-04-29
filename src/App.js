import { useState } from "react";
import "./App.css";
import HeaderButton from "./component/HeaderButton";
import WeeklyTable from "./component/WeeklyTable";
import Raid from "./component/Raid";
import DailyTable from "./component/DailyTable";

function App() {
  console.log(window.innerWidth);
  return (
    <div className="container">
      <div className="header"></div>
      <div className="body">
        <WeeklyTable />
      </div>
    </div>
  );
}

export default App;

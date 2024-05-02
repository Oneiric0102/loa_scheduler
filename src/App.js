import "./App.css";
import WeeklyTable from "./component/WeeklyTable";

function App() {
  console.log(window.innerWidth);
  return (
    <div className="container">
      <div className="body">
        <WeeklyTable />
      </div>
    </div>
  );
}

export default App;

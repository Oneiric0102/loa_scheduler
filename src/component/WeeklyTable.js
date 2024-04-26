import weekInfoJSON from "../table/basic.json";
import DailyTable from "./DailyTable";

export default function WeeklyTable() {
  const weekInfo = weekInfoJSON.weekInfo;
  console.log(weekInfo);
  return (
    <div className="weekly-table">
      {weekInfo.map((dayInfo, index) => {
        return <DailyTable key={index} dayInfo={dayInfo} />;
      })}
    </div>
  );
}

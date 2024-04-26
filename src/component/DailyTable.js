import { useState } from "react";
import Raid from "./Raid";

//시간을 20:00에서 08:00PM과 같은 형식으로 변환하는 함수
const timeFormatFunc = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  let formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  formattedHours = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export default function DailyTable({ dayInfo }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="daily-table">
      <div className="rally">{timeFormatFunc(dayInfo.rally)}</div>
      <div className="day">{dayInfo.day}</div>

      {dayInfo.scheduleList.map((raidInfo, index) => {
        return <Raid key={index} raidInfo={raidInfo} isOpen={isOpen} />;
      })}
    </div>
  );
}

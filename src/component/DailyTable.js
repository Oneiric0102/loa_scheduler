import { useState } from "react";
import Raid from "./Raid";
import styled from "@emotion/styled/macro";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const DailyTableBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.windowWidth >= 1200 ? "18%" : "90%")};
  font-size: 100%;
  padding: 1%;
  border-radius: 0.5vw;
  background-color: ${(props) =>
    props.isToday ? "rgba(224, 228, 237, 1)" : "transparent"};
`;
const DayHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 0.5rem;
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const Rally = styled.div`
  font-size: 100%;
  font-weight: bold;
  color: ${(props) =>
    props.isToday ? "rgba(59, 130, 246, 1)" : "rgba(122, 134, 153, 1)"};
`;

const Day = styled.div`
  font-size: 100%;
  font-weight: bold;
  color: ${(props) =>
    props.isToday ? "rgba(59, 130, 246, 1)" : "rgba(122, 134, 153, 1)"};
`;

//day값과 문자열을 매핑
const mapDayString = {
  0: "일요일",
  1: "월요일",
  2: "화요일",
  3: "수요일",
  4: "목요일",
  5: "금요일",
  6: "토요일",
};

//시간을 20:00에서 08:00PM과 같은 형식으로 변환하는 함수
const timeFormatFunc = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  let formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  formattedHours = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

const returnFoldButtonIcon = (
  dailyTableState,
  color,
  size,
  setDailyTableState
) => {
  if (dailyTableState === "normal")
    return (
      <MdOutlineKeyboardArrowUp
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDailyTableState("simple");
        }}
        color={color}
        size={size}
      />
    );
  else if (dailyTableState === "simple")
    return (
      <MdOutlineKeyboardDoubleArrowUp
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDailyTableState("fold");
        }}
        color={color}
        size={size}
      />
    );
  else if (dailyTableState === "fold")
    return (
      <MdOutlineKeyboardArrowDown
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDailyTableState("normal");
        }}
        color={color}
        size={size}
      />
    );
};

export default function DailyTable({ dayInfo, windowWidth }) {
  const [dailyTableState, setDailyTableState] = useState("normal");
  const isToday = dayInfo.day == new Date().getDay();
  return (
    <DailyTableBox isToday={isToday}>
      <DayHeader>
        {returnFoldButtonIcon(
          dailyTableState,
          isToday ? "rgba(59, 130, 246, 1)" : "rgba(122, 134, 153, 1)",
          "15%",
          setDailyTableState
        )}
        <DayInfo>
          <Day isToday={isToday}>{mapDayString[dayInfo.day]}</Day>
          <Rally isToday={isToday}>{timeFormatFunc(dayInfo.rally)}</Rally>
        </DayInfo>
      </DayHeader>
      {dayInfo.scheduleList.map((raidInfo, index) => {
        return (
          <Raid
            key={index}
            raidInfo={raidInfo}
            dailyTableState={dailyTableState}
          />
        );
      })}
    </DailyTableBox>
  );
}

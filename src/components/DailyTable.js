import { useState, useEffect } from "react";
import Raid from "./Raid";
import styled from "@emotion/styled/macro";
import { IoIosAdd } from "react-icons/io";
import DayButton from "./DayButton";
import RandomAlterImg from "./RandomAlterImg";

const DailyTableBox = styled.div`
  ${(props) => props.theme.flex.columnCenterTop};
  font-size: 1rem;
  gap: 1rem;
`;
const DayHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Rally = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) =>
    props.isToday ? "rgba(59, 130, 246, 1)" : "rgba(122, 134, 153, 1)"};
`;

const Day = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) =>
    props.isToday ? "rgba(59, 130, 246, 1)" : "rgba(122, 134, 153, 1)"};
`;

//day값과 문자열 매핑
const mapDayString = {
  0: "일요일",
  1: "월요일",
  2: "화요일",
  3: "수요일",
  4: "목요일",
  5: "금요일",
  6: "토요일",
};

//시간 포매팅 함수, 20:00 => 08:00PM
const timeFormatFunc = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  let formattedHours = hours % 12 || 12;
  const period = hours < 12 ? "AM" : "PM";

  formattedHours = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export default function DailyTable({ dayInfo, weekLength, isMobile }) {
  const [dailyTableState, setDailyTableState] = useState("normal");
  const isToday = dayInfo.day == new Date().getDay();

  useEffect(() => {
    if (isMobile === false) {
      setDailyTableState("normal");
    } else if (isMobile === true) {
      setDailyTableState("fold");
    }
  }, [isMobile]);

  return (
    <DailyTableBox
      isToday={isToday}
      weekLength={weekLength}
      dailyTableState={dailyTableState}
    >
      {isMobile ? null : (
        <DayButton
          day={dayInfo.day}
          selected={new Date().getDay()}
          onClick={() => {}}
          isMobile={false}
        />
      )}
      <DayHeader>
        <DayInfo>
          <Day isToday={isToday}>{mapDayString[dayInfo.day]}</Day>
        </DayInfo>
        <IoIosAdd />
      </DayHeader>
      <RandomAlterImg />
    </DailyTableBox>
  );
}

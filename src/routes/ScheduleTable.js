import weekInfoJSON from "../table/odd.json";
import DailyTable from "../components/DailyTable";
import styled from "@emotion/styled/macro";
import DayButton from "../components/DayButton";
import { useEffect, useState } from "react";

const WeeklyTableBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(12rem, 1fr));
  justify-content: center;
  align-content: start;
  grid-gap: 1rem;
  @media (max-width: 1000px) {
    ${(props) => props.theme.flex.columnCenterTop};
  }
`;

const DayButtonDiv = styled.div`
  ${(props) => props.theme.flex.rowBetweenCenter};
  width: 100%;
  margin-bottom: 2rem;
`;

export default function ScheduleTable() {
  const weekInfo = weekInfoJSON.weekInfo;
  const [selected, setSelected] = useState(new Date().getDay());
  const [isMobile, setIsMobile] = useState(
    window.innerWidth >= 1000 ? false : true
  );
  const [schedules, setSchedules] = useState([]);

  //반응형 웹 구현을 위해 화면의 너비를 체크
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setIsMobile(false);
      } else if (window.innerWidth < 1000) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClickDay = (day) => {
    setSelected(day);
  };

  return (
    <>
      {isMobile ? (
        <DayButtonDiv>
          <DayButton
            day={3}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={4}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={5}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={6}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={0}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={1}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
          <DayButton
            day={2}
            selected={selected}
            onClick={onClickDay}
            isMobile={true}
          />
        </DayButtonDiv>
      ) : null}

      <WeeklyTableBox>
        {weekInfo.map((dayInfo, index) => {
          return (
            <DailyTable
              key={index}
              dayInfo={dayInfo}
              weekLength={weekInfo.length}
              isMobile={isMobile}
            />
          );
        })}
      </WeeklyTableBox>
    </>
  );
}

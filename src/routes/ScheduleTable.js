import weekInfoJSON from "../table/odd.json";
import DailyTable from "../components/DailyTable";
import styled from "@emotion/styled/macro";
import DayButton from "../components/DayButton";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSnapshot } from "../hooks/useSnapshot";

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
  const scheduleQuery = query(collection(db, "schedule"));
  const schedule = useSnapshot(scheduleQuery);
  const [selected, setSelected] = useState(new Date().getDay());
  const [isMobile, setIsMobile] = useState(
    window.innerWidth >= 1000 ? false : true
  );
  const [scheduleList, setScheduleList] = useState([]);

  //모바일버전 체크 이벤트 리스너 등록
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

  useEffect(() => {
    setScheduleList(
      schedule.sort((a, b) => {
        const aMod = (a.day + 4) % 7;
        const bMod = (b.day + 4) % 7;
        return aMod - bMod;
      })
    );
  }, [schedule]);

  const onClickDay = (day) => {
    if (isMobile) {
      setSelected(day);
    }
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
        {schedule.length > 0
          ? schedule.map((dayInfo) => {
              return (
                <DailyTable
                  key={dayInfo.day}
                  dayInfo={dayInfo}
                  isMobile={isMobile}
                />
              );
            })
          : null}
      </WeeklyTableBox>
    </>
  );
}

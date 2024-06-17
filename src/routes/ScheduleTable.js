import DailyTable from "../components/DailyTable";
import styled from "@emotion/styled/macro";
import DayButton from "../components/DayButton";
import { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSnapshot } from "../hooks/useSnapshot";
import { useMobileContext } from "../context/MobileContext";

const WeeklyTableBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(12rem, 1fr));
  justify-content: start;
  align-content: start;
  grid-gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  &::-webkit-scrollbar {
    height: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.scrollTrack};
    border-radius: 0.1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.scrollThumb};
    border-radius: 0.1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primary40};
  }
  @media (max-width: 520px) {
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
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  const [scheduleList, setScheduleList] = useState([]);
  const dayList = [3, 4, 5, 6, 0, 1, 2];
  const raids = useSnapshot(query(collection(db, "raid")));
  const isMobile = useMobileContext();

  useEffect(() => {
    setScheduleList(
      schedule.sort((a, b) => {
        const aMod = (a.day + 4) % 7;
        const bMod = (b.day + 4) % 7;
        return aMod - bMod;
      })
    );
  }, [schedule]);

  useEffect(() => {}, [selectedDayInfo]);

  useEffect(() => {
    if (scheduleList.length > 0) {
      setSelectedDayInfo(
        scheduleList.find((dayInfo) => dayInfo.day === selected)
      );
    }
  }, [selected, scheduleList]);

  const onClickDay = (day) => {
    if (isMobile) {
      setSelected(day);
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <DayButtonDiv>
            {dayList.map((day) => {
              return (
                <DayButton
                  day={day}
                  selected={selected}
                  onClick={onClickDay}
                  isMobile={true}
                  key={day}
                />
              );
            })}
          </DayButtonDiv>
          {selectedDayInfo !== null ? (
            <DailyTable
              raids={raids}
              scheduleList={scheduleList}
              dayInfo={selectedDayInfo}
              key={selectedDayInfo.day}
              isMobile={isMobile}
            />
          ) : null}
        </>
      ) : (
        <WeeklyTableBox>
          {scheduleList.length > 0
            ? scheduleList.map((dayInfo) => {
                return (
                  <DailyTable
                    raids={raids}
                    scheduleList={scheduleList}
                    key={dayInfo.day}
                    dayInfo={dayInfo}
                    isMobile={isMobile}
                  />
                );
              })
            : null}
        </WeeklyTableBox>
      )}
    </>
  );
}

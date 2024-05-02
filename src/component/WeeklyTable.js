import weekInfoJSON from "../table/odd.json";
import DailyTable from "./DailyTable";
import styled from "@emotion/styled/macro";

const WeeklyTableBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
  margin: 1rem;
`;

export default function WeeklyTable() {
  const weekInfo = weekInfoJSON.weekInfo;

  return (
    <WeeklyTableBox>
      {weekInfo.map((dayInfo, index) => {
        return (
          <DailyTable
            key={index}
            dayInfo={dayInfo}
            weekLength={weekInfo.length}
          />
        );
      })}
    </WeeklyTableBox>
  );
}

import { useState, useEffect } from "react";
import weekInfoJSON from "../table/basic.json";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // 윈도우 크기 변경 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WeeklyTableBox windowWidth={windowWidth}>
      {weekInfo.map((dayInfo, index) => {
        return (
          <DailyTable key={index} dayInfo={dayInfo} windowWidth={windowWidth} />
        );
      })}
    </WeeklyTableBox>
  );
}

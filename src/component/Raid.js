import { useState, useEffect } from "react";
import partyListJSON from "../table/partyList.json";
import Character from "./Character";
import styled from "@emotion/styled/macro";

const RaidBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 1rem);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  margin-top: ${({ dailyTableState }) =>
    dailyTableState === "fold" ? "0" : "1rem"};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: ${({ dailyTableState }) =>
    dailyTableState === "fold"
      ? "0"
      : dailyTableState === "simple"
      ? "3.4375rem"
      : "40rem"};

  &.initial {
    transition: none;
  }
`;

const RaidName = styled.div`
  font-size: 1.2rem;
  width: calc(100% - 4rem);
  font-weight: bold;
  white-space: nowrap;
  padding: 0 1rem;
  margin: 1rem;
  color: 1F2633;
`;

const RaidCharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(242, 244, 247, 1);
  border-radius: 0.5rem;
  width: calc(100% - 4rem);
  gap: 1rem;
  padding: 1rem;
  margin: 0 1rem 1rem 1rem;
`;

export default function Raid({ raidInfo, dailyTableState }) {
  //json 파일로부터 데이터를 받아 와 초기화
  const raidName = partyListJSON.raidList[raidInfo.raid];
  const partyList = partyListJSON[raidInfo.party];

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 페이지가 로드되고 1초 뒤에 초기화 상태를 변경하여 트랜지션 효과가 있는 CSS 클래스가 적용되도록 함
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RaidBox
      dailyTableState={dailyTableState}
      className={initialized ? "" : "initial"}
    >
      <RaidName>{raidName}</RaidName>
      <RaidCharacterBox dailyTableState={dailyTableState}>
        {partyList.map((characterInfo, index) => (
          <Character key={index} characterInfo={characterInfo} />
        ))}
      </RaidCharacterBox>
    </RaidBox>
  );
}

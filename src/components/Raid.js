import { useState, useEffect } from "react";
import partyListJSON from "../table/partyList.json";
import Character from "./Character";
import styled from "@emotion/styled/macro";

const RaidBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  font-weight: bold;
  white-space: nowrap;
  color: #1f2633;
`;

const RaidCharacterBox = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  background-color: rgba(242, 244, 247, 1);
  border-radius: 0.5rem;
  gap: 1rem;
`;

export default function Raid({ raidInfo, dailyTableState }) {
  const raidName = partyListJSON.raidList[raidInfo.raid];
  const partyList =
    raidInfo.party === "undetermined" ? null : partyListJSON[raidInfo.party];

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    //처음 로드시 트랜지션 방지
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
      {partyList !== null ? (
        <RaidCharacterBox dailyTableState={dailyTableState}>
          {partyList.map((characterInfo, index) => (
            <Character key={index} characterInfo={characterInfo} />
          ))}
        </RaidCharacterBox>
      ) : (
        <></>
      )}
    </RaidBox>
  );
}

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
      : "19.9375rem"};
`;

const RaidName = styled.div`
  font-size: 1.2rem;
  width: calc(100% - 4rem);
  font-weight: bold;
  white-space: nowrap;
  padding: 0 1rem;
  margin: 1rem;
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

  return (
    <RaidBox dailyTableState={dailyTableState}>
      <RaidName>{raidName}</RaidName>
      <RaidCharacterBox dailyTableState={dailyTableState}>
        {partyList.map((characterInfo, index) => (
          <Character key={index} characterInfo={characterInfo} />
        ))}
      </RaidCharacterBox>
    </RaidBox>
  );
}

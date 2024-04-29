import partyListJSON from "../table/partyList.json";
import Character from "./Character";
import styled from "@emotion/styled/macro";

const RaidBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 3px 0px rgba(96, 108, 128, 0.05);
  margin-top: 1rem;
  border-radius: 0.5vw;
`;

const RaidName = styled.div`
  font-size: 120%;
  width: 80%;
  font-weight: bold;
  white-space: nowrap;
  padding: 5% 10%;
`;

const RaidCharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(242, 244, 247, 1);
  border-radius: 0.5vw;
  width: 80%;
  gap: 1rem;
  padding: 5%;
  margin: 0 5% 5% 5%;
`;

export default function Raid({ raidInfo, dailyTableState }) {
  //json 파일로부터 데이터를 받아 와 초기화
  const raidName = partyListJSON.raidList[raidInfo.raid];
  const partyList = partyListJSON[raidInfo.party];

  return dailyTableState == "fold" ? (
    <></>
  ) : (
    <RaidBox>
      <RaidName>{raidName}</RaidName>
      {dailyTableState == "simple" ? (
        <></>
      ) : (
        <RaidCharacterBox isOpen={true}>
          {partyList.map((characterInfo, index) => (
            <Character key={index} characterInfo={characterInfo} />
          ))}
        </RaidCharacterBox>
      )}
    </RaidBox>
  );
}

import partyListJSON from "../table/partyList.json";
import Character from "./Character";

export default function Raid({ raidInfo, isOpen }) {
  //json 파일로부터 데이터를 받아 와 초기화
  const raidName = partyListJSON.raidList[raidInfo.raid];
  const partyList = partyListJSON[raidInfo.party];

  return (
    <div className="raid-box">
      <div className="raid-name">{raidName}</div>
      <div
        className="raid-character-box"
        style={isOpen ? { display: "flex" } : { display: "none" }} // isOpen에 따라 보이는지 여부 설정
      >
        {partyList.map((characterInfo, index) => (
          <Character key={index} characterInfo={characterInfo} />
        ))}
      </div>
    </div>
  );
}

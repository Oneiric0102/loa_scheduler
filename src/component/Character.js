export default function Character({ characterInfo }) {
  return (
    <div className="character-box">
      <div className="character-level">{characterInfo.level}</div>
      <div className="character-class">{characterInfo.class}</div>
      <div className="character-name">{characterInfo.nickname}</div>
    </div>
  );
}

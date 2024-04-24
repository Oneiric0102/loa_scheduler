import Character from "./Character";
import Raid from "./Raid";

export default function DayTable() {
  return (
    <div className="dayBox">
      <Raid>
        <Character />
        <Character />
        <Character />
        <Character />
      </Raid>
    </div>
  );
}

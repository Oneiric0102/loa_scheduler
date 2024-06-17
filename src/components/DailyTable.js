import { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled/macro";
import DayButton from "./DayButton";
import RandomAlterImg from "./RandomAlterImg";
import { MdEdit, MdAdd } from "react-icons/md";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { debounce } from "lodash";
import { modals } from "./Modals";
import useModals from "../hooks/useModals";
import { useSnapshot } from "../hooks/useSnapshot";
import Schedule from "./Schedule";

const DailyTableBox = styled.div`
  ${(props) => props.theme.flex.columnCenterTop};
  font-size: 1rem;
  gap: 1rem;
`;

const Rally = styled.span`
  ${(props) => props.theme.flex.rowCenter};
  gap: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 2rem;
  padding: 0.5rem 0;
`;

const Icon = styled.span`
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }

  cursor: pointer;
  font-size: 1.25rem;
`;

const CustomTimePicker = styled.input`
  background-color: ${(props) => props.theme.colors.surface};
  border: none;
  font-size: 1rem;
  font-family: ${(props) => props.theme.font.content};
  color: ${(props) => props.theme.colors.primary};
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export default function DailyTable({ dayInfo, isMobile, raids, scheduleList }) {
  const isToday = dayInfo.day === new Date().getDay();
  const [rally, setRally] = useState(dayInfo.rally);
  const inputRef = useRef(null);
  const daySchedules = useSnapshot(
    query(collection(dayInfo.ref, "daySchedules"))
  );

  const { openModal } = useModals();

  const handleEditClick = () => {
    inputRef.current.showPicker();
  };

  const handleAddClick = () => {
    const daySchedulesRef = collection(dayInfo.ref, "daySchedules");
    const docRef = doc(daySchedulesRef);
    openModal(modals.schedule, {
      dayNum: parseInt(dayInfo.day),
      raids: raids,
      scheduleList: scheduleList,
      daySchedule: {
        raid: "",
        difficulty: "",
        party: "",
        isDone: false,
        id: docRef.id,
      },
    });
  };

  const updateRally = async (time) => {
    await updateDoc(dayInfo.ref, { rally: time });
  };

  const debounceUpdate = useCallback(
    debounce((time) => updateRally(time), 500),
    []
  );

  useEffect(() => {
    debounceUpdate(rally);
  }, [rally]);

  return (
    <DailyTableBox isToday={isToday}>
      {isMobile ? null : (
        <DayButton
          day={dayInfo.day}
          selected={new Date().getDay()}
          onClick={() => {}}
          isMobile={false}
        />
      )}
      <Rally>
        <CustomTimePicker
          type="time"
          value={rally}
          onChange={(e) => {
            setRally(e.target.value);
          }}
          ref={inputRef}
        />
        <Icon onClick={handleEditClick}>
          <MdEdit />
        </Icon>
        <Icon>
          <MdAdd onClick={handleAddClick} />
        </Icon>
      </Rally>
      {daySchedules.length > 0 ? (
        daySchedules.map((daySchedule) => {
          return (
            <Schedule
              daySchedule={daySchedule}
              dayInfo={dayInfo}
              raids={raids}
              scheduleList={scheduleList}
              key={daySchedule.id}
            />
          );
        })
      ) : (
        <RandomAlterImg />
      )}
    </DailyTableBox>
  );
}

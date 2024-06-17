import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { usePartyInfo } from "../hooks/usePartyInfo";
import { useEffect, useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import styled from "@emotion/styled/macro";
import { modals } from "./Modals";
import Character from "./Character";
import useModals from "../hooks/useModals";
import { CSSTransition } from "react-transition-group";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnCenterTop};
  gap: 1rem;
  width: 100%;
  flex-shrink: 0;
`;

const Characters = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  border-radius: 1rem;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  padding: 1rem;
  width: calc(100% - 2rem);
  white-space: nowrap;
`;

const Title = styled.div`
  ${(props) => props.theme.flex.rowBetweenCenter};
  font-size: 1rem;
  font-weight: bold;
  width: calc(100% - 1rem);
  padding: 0 0.5rem;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) =>
    props.isDone ? props.theme.colors.primary40 : props.theme.colors.primary};
  text-decoration: ${(props) => (props.isDone ? "line-through;" : "none")};
`;

const TitleWrapper = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  gap: 1rem;
`;
const NullDiv = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  width: 100%;
  height: 2.3rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.secondaryText};
  flex-shrink: 0;
`;

const Icons = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  gap: 0.5rem;
`;

const Icon = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.1s ease-out;
`;

const transitionStyles = {
  entering: (maxHeight) => ({
    maxHeight: maxHeight,
  }),
  entered: (maxHeight) => ({
    maxHeight: maxHeight,
  }),
  exiting: (maxHeight) => ({
    maxHeight: "0",
  }),
  exited: (maxHeight) => ({
    maxHeight: "0",
  }),
};

const duration = 300;

// 트랜지션 기본 스타일 객체
const defaultStyle = {
  transition: `max-height ${duration}ms ease-in-out`,
  maxHeight: "0",
  overflow: "hidden",
};

const Schedule = ({ dayInfo, raids, scheduleList, daySchedule }) => {
  const [scheduleName, setScheduleName] = useState("");
  const [participants, setParticipants] = useState(null);
  const [isDone, setDone] = useState(daySchedule.isDone);
  const [maxHeight, setMaxHeight] = useState(0);
  const participantList = usePartyInfo(participants);

  const { openModal } = useModals();

  //스케줄 정보를 얻어오는 함수
  const getDayScheduleInfo = async (raidId, difficultyId, partyId) => {
    const raidDocRef = doc(db, "raid", raidId);
    const difficultyDocRef = doc(
      db,
      "raid",
      raidId,
      "difficulty",
      difficultyId
    );
    const partyDocRef = doc(db, "parties", partyId);

    const raidDocSnapshot = await getDoc(raidDocRef);
    const difficultyDocSnapshot = await getDoc(difficultyDocRef);
    const partyDocSnapshot = await getDoc(partyDocRef);

    if (raidDocSnapshot.exists() && difficultyDocSnapshot.exists()) {
      setScheduleName(
        `${raidDocSnapshot.data().raidName} ${
          difficultyDocSnapshot.data().difficultyName
        }`
      );
    }

    if (partyDocSnapshot.exists()) {
      const participantsRef = collection(partyDocRef, "participants");
      const participantsSnapshot = await getDocs(participantsRef);
      setParticipants(
        participantsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  };

  useEffect(() => {
    getDayScheduleInfo(
      daySchedule.raid,
      daySchedule.difficulty,
      daySchedule.party
    );
  }, [daySchedule]);

  useEffect(() => {
    if (
      participantList !== null &&
      participantList !== undefined &&
      participantList.length > 0
    ) {
      setMaxHeight(`${participantList.length * 12.5 + 1}rem`);
    }
  }, [participantList]);
  const changeDone = () => {
    setDone((current) => !current);
  };

  //완료여부를 db에 업데이트
  useEffect(() => {
    updateDoc(daySchedule.ref, { isDone: isDone });
  }, [isDone, daySchedule]);

  const deleteSchedule = () => {
    console.log(dayInfo.id);
    console.log(daySchedule.id);
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      deleteDoc(daySchedule.ref);
    }
  };

  const editSchedule = () => {
    openModal(modals.schedule, {
      dayNum: parseInt(dayInfo.day),
      raids: raids,
      scheduleList: scheduleList,
      daySchedule: daySchedule,
    });
  };

  return (
    <Wrapper>
      <Title isDone={isDone}>
        <TitleWrapper>
          <Icon onClick={changeDone}>
            {isDone ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </Icon>
          {scheduleName}
        </TitleWrapper>
        <Icons>
          <Icon>
            <MdEdit onClick={editSchedule} />
          </Icon>
          <Icon>
            <MdDelete onClick={deleteSchedule} />
          </Icon>
        </Icons>
      </Title>
      <CSSTransition in={!isDone} timeout={duration} unmountOnExit>
        {(state) => (
          <Characters
            style={{
              ...defaultStyle,
              ...transitionStyles[state](maxHeight),
            }}
            maxHeight={maxHeight}
          >
            {participantList.length > 0 ? (
              participantList.map((participant) => {
                const characterInfo = {
                  nickname: participant.nickname,
                  level: participant.level,
                  class: participant.class,
                };
                return (
                  <Character
                    characterInfo={characterInfo}
                    key={daySchedule.party + participant.id}
                  />
                );
              })
            ) : (
              <NullDiv>캐릭터 정보가 없습니다.</NullDiv>
            )}
          </Characters>
        )}
      </CSSTransition>
    </Wrapper>
  );
};

export default Schedule;

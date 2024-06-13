import styled from "@emotion/styled/macro";
import CustomSelect from "./CustomSelect";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { orderBy } from "lodash";
import { db } from "../firebase";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 1rem;
`;
const SubTitle = styled.h2`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) => props.theme.colors.primaryText};
`;

const ButtonDiv = styled.div`
  ${(props) => props.theme.flex.rowRightCenter};
  gap: 0.25rem;
  margin-top: 1rem;
  width: 100%;
`;
const CustomButton = styled.button`
  ${(props) => props.theme.flex.rowCenter};
  background-color: ${(props) =>
    props.delete ? props.theme.colors.delete : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  font-size: 1rem;
  width: 3rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.delete
        ? props.theme.colors.deleteHover
        : props.theme.colors.primaryHover};
  }
`;

const SelectBox = styled.div`
  width: 100%;
`;

const Icon = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.1s ease-out;
`;

const ScheduleForm = ({
  onSubmit,
  onClose,
  dayNum,
  raids,
  scheduleList,
  daySchedule,
}) => {
  const [day, setDay] = useState(dayNum);
  const [raidId, setRaidId] = useState(daySchedule.raid);
  const [difficultyId, setDifficultyId] = useState(daySchedule.difficulty);
  const [partyId, setPartyId] = useState(daySchedule.party);
  const [raidOptions, setRaidOptions] = useState([]);
  const [difficultyList, setDifficultyList] = useState([]);
  const [difficultyOptions, setDifficultyOptions] = useState([]);
  const [partyList, setPartyList] = useState([]);
  const [partyOptions, setPartyOptions] = useState([]);
  const [isDone, setDone] = useState(daySchedule.isDone);

  const dayOptions = [
    { value: 0, label: "일요일" },
    { value: 1, label: "월요일" },
    { value: 2, label: "화요일" },
    { value: 3, label: "수요일" },
    { value: 4, label: "목요일" },
    { value: 5, label: "금요일" },
    { value: 6, label: "토요일" },
  ];

  //레이드 옵션 초기화
  useEffect(() => {
    setRaidOptions(
      raids.map((raid) => ({
        value: raid.id,
        label: raid.raidName,
      }))
    );
  }, [raids]);

  //레이드 옵션 변경 시 난이도 리스트 가져오는 함수
  const getDifficultyList = async () => {
    if (raidId != "") {
      const selectedRaid = raids.find((raid) => raid.id === raidId);

      const difficultyQuery = query(
        collection(selectedRaid.ref, "difficulty"),
        orderBy("level")
      );
      const difficultySnapshot = (await getDocs(difficultyQuery)).docs;
      let transformedData = [];

      for (const snapshot of difficultySnapshot) {
        transformedData = [
          ...transformedData,
          { ...snapshot.data(), id: snapshot.id },
        ];
      }
      setDifficultyList(transformedData);
    } else {
      setDifficultyList([]);
    }
  };

  useEffect(() => {
    getDifficultyList();
  }, [raidId]);

  //난이도 옵션 초기화 및 재설정
  useEffect(() => {
    setDifficultyOptions(
      difficultyList.map((difficulty) => ({
        value: difficulty.id,
        label: `${difficulty.difficultyName} (레벨제한 : ${difficulty.level})`,
      }))
    );
  }, [difficultyList]);

  //파티 목록 불러오는 함수
  const getParties = async () => {
    const partyQuery = query(collection(db, "parties"));
    const partySnapshot = (await getDocs(partyQuery)).docs;
    let transformedData = [];

    for (const snapshot of partySnapshot) {
      transformedData = [
        ...transformedData,
        { ...snapshot.data(), id: snapshot.id },
      ];
    }
    setPartyList(transformedData);
  };
  //파티목록초기화
  useEffect(() => {
    getParties();
  }, []);
  //파티옵션초기화
  useEffect(() => {
    setPartyOptions(
      partyList.map((party) => ({ value: party.id, label: party.name }))
    );
  }, [partyList]);

  const handleSubmit = (e) => {
    updateSchedule();
    if (raidId === "" || difficultyId === "" || partyId === "") {
      e.preventDefault();
      return;
    }
    onSubmit();
  };

  //요일 변경 함수
  const changeDay = (selectedOption) => {
    setDay(selectedOption.value);
  };
  const changeRaid = (selectedOption) => {
    setRaidId(selectedOption.value);
    setDifficultyId("");
  };
  const changeDifficulty = (selectedOption) => {
    setDifficultyId(selectedOption.value);
  };
  const changeParty = (selectedOption) => {
    setPartyId(selectedOption.value);
  };
  const changeDone = () => {
    setDone((current) => !current);
  };

  //firebase store 스케줄 업데이트 함수
  const updateSchedule = async () => {
    if (raidId === "") {
      alert("레이드를 선택해주세요");
      return;
    } else if (difficultyId === "") {
      alert("난이도를 선택해주세요");
      return;
    } else if (partyId === "") {
      alert("파티를 선택해주세요");
      return;
    }

    const data = {
      raid: raidId,
      difficulty: difficultyId,
      party: partyId,
      isDone: isDone,
    };

    console.log(data);

    const daySchedulesRef = collection(
      scheduleList.find((schedule) => schedule.day === dayNum).ref,
      "daySchedules"
    );
    const updateSchedulesRef = collection(
      scheduleList.find((schedule) => schedule.day === day).ref,
      "daySchedules"
    );
    const dayScheduleDocRef = doc(daySchedulesRef, daySchedule.id);
    const dayScheduleDoc = await getDoc(dayScheduleDocRef);
    if (day === dayNum) {
      console.log("요일일치");
      if (dayScheduleDoc.exists()) {
        updateDoc(dayScheduleDocRef, data);
      } else {
        addDoc(daySchedulesRef, data);
      }
      if (day !== dayNum) {
        console.log("요일불일치");
        if (dayScheduleDoc.exists()) {
          deleteDoc(dayScheduleDocRef, data);
        }
        addDoc(updateSchedulesRef, data);
      }
    }
  };
  return (
    <Wrapper>
      <SubTitle>요일</SubTitle>
      <SelectBox>
        <CustomSelect
          value={
            dayNum === null
              ? null
              : dayOptions.find((option) => option.value === day)
          }
          onChange={changeDay}
          placeholder={"요일 선택"}
          options={dayOptions}
        />
      </SelectBox>
      <SubTitle>레이드</SubTitle>
      <SelectBox>
        <CustomSelect
          value={
            raidId === ""
              ? null
              : raidOptions.find((option) => option.value === raidId)
          }
          onChange={changeRaid}
          placeholder={"레이드 선택"}
          options={raidOptions}
        />
      </SelectBox>
      <SubTitle>난이도</SubTitle>
      <SelectBox>
        <CustomSelect
          value={
            difficultyId === ""
              ? null
              : difficultyOptions.find(
                  (option) => option.value === difficultyId
                )
          }
          onChange={changeDifficulty}
          placeholder={"난이도 선택"}
          options={difficultyOptions}
        />
      </SelectBox>
      <SubTitle>파티</SubTitle>
      <SelectBox>
        <CustomSelect
          value={
            partyId === ""
              ? null
              : partyOptions.find((option) => option.value === partyId)
          }
          onChange={changeParty}
          placeholder={"파티 선택"}
          options={partyOptions}
        />
      </SelectBox>

      <ButtonDiv>
        <CustomButton onClick={(e) => handleSubmit(e)}>저장</CustomButton>
        <CustomButton onClick={onClose} delete={true}>
          취소
        </CustomButton>
      </ButtonDiv>
    </Wrapper>
  );
};

export default ScheduleForm;

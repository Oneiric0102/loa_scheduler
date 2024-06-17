import styled from "@emotion/styled/macro";
import { MdAddCircle } from "react-icons/md";
import ParticipantSelection from "./ParticipantSelection";
import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { debounce } from "lodash";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 1rem;
`;
const SubTitle = styled.h2`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) => props.theme.colors.primaryText};
`;
const CustomInput = styled.input`
  width: calc(100% - 1rem);
  border: 2px solid
    ${(props) => (props.warning ? props.theme.colors.delete : "transparent")};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  font-size: 1rem;
  &:focus {
    border: 2px solid
      ${(props) =>
        props.warning ? props.theme.colors.delete : props.theme.colors.primary};
    outline: none;
  }
`;
const Icon = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    color: ${(props) => props.theme.colors.primaryHover};
  }
  cursor: pointer;
  transition: color 0.1s ease-out;
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

const ButtonDiv = styled.div`
  ${(props) => props.theme.flex.rowRightCenter};
  gap: 0.25rem;
  margin-top: 1rem;
  width: 100%;
`;

const Warning = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.delete};
`;

const PartyForm = ({ onSubmit, onClose, players, party, participants }) => {
  const [partyName, setPartyName] = useState(party.name);
  const [participantList, setParticipantList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [error, setError] = useState("");
  const partiesRef = collection(db, "parties");

  useEffect(() => {
    const addedRegister = participants.map((participant) => ({
      ...participant,
      registered: participant.hasOwnProperty("registered")
        ? participant.registered
        : true,
    }));
    setParticipantList(addedRegister);
  }, []);

  const updateParticipantInfo = (id, updatedInfo) => {
    setParticipantList((prevList) =>
      prevList.map((participant) =>
        participant.id === id ? updatedInfo : participant
      )
    );
  };

  //파티 추가일 경우 이름 체크하는 함수
  const checkNameDuplication = async (name) => {
    const partyQuery = query(partiesRef, where("name", "==", name));
    const querySnapshot = await getDocs(partyQuery);
    if (!querySnapshot.empty && party.name !== name) {
      setError("이미 존재하는 파티 이름입니다.");
    } else {
      setError("");
    }
  };

  const debounceCheck = useCallback(
    debounce((name) => checkNameDuplication(name), 500),
    []
  );

  //파티 이름 변경시 유효성 확인
  useEffect(() => {
    if (partyName === "") {
      setError("파티 이름을 입력해주세요");
    } else {
      debounceCheck(partyName);
    }

    return () => {
      debounceCheck.cancel();
    };
  }, [partyName, debounceCheck]);

  //캐릭터 삭제 콜백함수
  const delParticipantInput = (id, registered, beDelete) => {
    console.log("partyDel");
    if (registered) {
      if (beDelete) {
        setDeleteList((current) => current.filter((delId) => delId != id));
      } else {
        setDeleteList((current) => [...current, id]);
      }
    } else {
      setParticipantList((current) =>
        current.filter((participant) => participant.id != id)
      );
    }
  };

  //캐릭터 추가 버튼
  const addParticipantInput = () => {
    let participantsRef = null;
    if (party.name === "") {
      participantsRef = collection(db, "temp");
    } else {
      participantsRef = collection(party.ref, "participants");
    }
    const docRef = doc(participantsRef);

    setParticipantList((current) => [
      ...current,
      {
        characterId: "",
        class: "",
        id: docRef.id,
        registered: false,
        owner: "",
      },
    ]);
  };

  //플레이어 추가일 경우 players 컬렉션에 문서를 추가
  const addParty = async () => {
    await addDoc(partiesRef, { name: partyName, createdAt: new Date() });
  };

  //submit시 발동 될 firebase store 업데이트 함수
  const updateParticipant = async () => {
    if (error !== "") {
      return;
    }

    let partyQuery = null;

    if (party.name === "") {
      addParty();
      partyQuery = query(partiesRef, where("name", "==", partyName));
    } else {
      partyQuery = query(partiesRef, where("name", "==", party.name));
    }

    let partySnapshot = (await getDocs(partyQuery)).docs;

    for (const partyDoc of partySnapshot) {
      const batch = writeBatch(db);
      const participantsRef = collection(partyDoc.ref, "participants");

      const partyDocRef = doc(db, "parties", partyDoc.id);
      updateDoc(partyDocRef, { name: partyName });

      for (const participant of participantList) {
        const participantId = participant.id;
        let participantDocRef = doc(participantsRef, participantId);
        let participantDoc = await getDoc(participantDocRef);
        //공백체크
        if (participant.characterId === "" || participant.owner === "") {
          continue;
        }

        //DB에 저장하기 위한 객체 생성
        const data = {
          owner: participant.owner,
          characterId: participant.characterId,
        };
        console.log(data);
        //문서가 삭제목록에 있다면 문서를 삭제
        if (participantDoc.exists() && deleteList.includes(participantId)) {
          batch.delete(participantDocRef);
        }
        //삭제가 아닌경우
        else {
          if (participantDoc.exists()) {
            // 문서가 존재하면 업데이트
            batch.update(participantDocRef, data);
            console.log("업뎃");
          } else {
            // 문서가 존재하지 않으면 새 문서 생성
            participantDocRef = doc(participantsRef, participantId);
            batch.set(participantDocRef, data);
            console.log("생성");
          }
        }
      }
      await batch.commit();
    }
  };

  const handleSubmit = (e) => {
    if (error !== "") {
      e.preventDefault();
      return;
    }
    updateParticipant();
    onSubmit();
  };

  return (
    <Wrapper>
      <SubTitle>파티 이름</SubTitle>
      <CustomInput
        value={partyName}
        onChange={(e) => setPartyName(e.currentTarget.value)}
        warning={error.length > 0}
        placeholder={party.name}
      />
      {error.length > 0 ? <Warning>{error}</Warning> : null}
      <SubTitle>
        캐릭터 목록
        <Icon onClick={addParticipantInput}>
          <MdAddCircle />
        </Icon>
      </SubTitle>
      {participantList.length > 0
        ? participantList.map((participant) => {
            return (
              <ParticipantSelection
                updateParticipantInfo={updateParticipantInfo}
                delParticipantInput={delParticipantInput}
                participantInfo={participant}
                key={participant.id}
                players={players}
              />
            );
          })
        : "캐릭터 정보가 없습니다."}
      <ButtonDiv>
        <CustomButton onClick={handleSubmit}>저장</CustomButton>
        <CustomButton onClick={onClose} delete={true}>
          취소
        </CustomButton>
      </ButtonDiv>
    </Wrapper>
  );
};

export default PartyForm;

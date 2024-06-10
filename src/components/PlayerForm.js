import styled from "@emotion/styled/macro";
import CharacterInput from "./CharacterInput";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
  getDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";

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

const CharacterList = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 2rem;
  width: 100%;
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

const PlayerForm = ({ player, characters, onSubmit, onClose }) => {
  const [characterList, setCharacterList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [addCount, setAddCount] = useState(0);
  const [playerName, setPlayerName] = useState(player.name);

  //캐릭터 추가 버튼
  const addCharacterInput = () => {
    setCharacterList((current) => [
      ...current,
      {
        nickname: "",
        level: "",
        class: "",
        id: addCount,
        registered: false,
      },
    ]);
    setAddCount((current) => current + 1);
  };

  //캐릭터 삭제 버튼
  const delCharacterInput = (id, registered, beDelete) => {
    if (registered) {
      if (beDelete) {
        setDeleteList((current) => current.filter((delId) => delId != id));
      } else {
        setDeleteList((current) => [...current, id]);
      }
    } else {
      setCharacterList((current) =>
        current.filter((character) => character.id != id)
      );
    }
  };

  //기존에 등록된 캐릭터는 삭제 여부가 가역적이여야 하므로 객체에 registered 변수 추가
  useEffect(() => {
    const addedRegister = characters.map((character) => ({
      ...character,
      registered: character.hasOwnProperty("registered")
        ? character.registered
        : true,
    }));
    setCharacterList(addedRegister);
  }, []);

  //플레이어 추가일 경우 players 컬렉션에 문서를 추가
  const addPlayer = async () => {
    const playersRef = collection(db, "players");
    await addDoc(playersRef, { name: playerName, createdAt: new Date() });
  };

  //submit시 발동 될 firebase store 업데이트 함수
  const updateCharacter = async () => {
    if (playerName === "") {
      return;
    }

    let playerQuery = null;

    if (player.name === "") {
      addPlayer();
      playerQuery = query(
        collection(db, "players"),
        where("name", "==", playerName)
      );
    } else {
      playerQuery = query(
        collection(db, "players"),
        where("name", "==", player.name)
      );
    }

    let playerSnapshot = (await getDocs(playerQuery)).docs;

    for (const playerDoc of playerSnapshot) {
      const batch = writeBatch(db);
      const charactersRef = collection(playerDoc.ref, "characters");

      const playerDocRef = doc(db, "players", playerDoc.id);
      updateDoc(playerDocRef, { name: playerName });

      for (const character of characterList) {
        const characterId = String(character.id);
        let characterDocRef = doc(charactersRef, characterId);
        let characterDoc = await getDoc(characterDocRef);
        //공백체크
        if (
          character.nickname === "" ||
          character.level === "" ||
          character.class === ""
        ) {
          continue;
        }

        //DB에 저장하기 위한 객체 생성
        const data = {
          nickname: character.nickname,
          level: parseInt(character.level),
          class: character.class,
        };
        console.log(data);
        //문서가 삭제목록에 있다면 문서를 삭제
        if (characterDoc.exists() && deleteList.includes(characterId)) {
          batch.delete(characterDocRef);
          console.log(`문서가 삭제되었습니다. 문서 ID: ${characterId}`);
        }
        //삭제가 아닌경우
        else {
          if (characterDoc.exists()) {
            // 문서가 존재하면 업데이트
            batch.update(characterDocRef, data);
            console.log(`문서가 업데이트되었습니다. 문서 ID: ${characterId}`);
            console.log(characterDocRef);
          } else {
            // 문서가 존재하지 않으면 새 문서 생성
            characterDocRef = doc(charactersRef); // 자동으로 랜덤 ID를 생성함
            characterDoc = await getDoc(characterDocRef);
            batch.set(characterDocRef, data);
            console.log("문서 ID가 존재하지 않아 새 문서가 생성되었습니다.");
          }
        }
      }
      await batch.commit();
    }
  };

  //자식 컴포넌트에서 정보를 업데이트 하기 위한 콜백함수
  const updateCharacterInfo = (id, updatedInfo) => {
    setCharacterList((prevList) =>
      prevList.map((character) =>
        character.id === id ? updatedInfo : character
      )
    );
  };

  const handleSubmit = (e) => {
    if (playerName === "") {
      e.preventDefault();
      return;
    }
    updateCharacter();
    onSubmit();
  };

  return (
    <Wrapper>
      <SubTitle>플레이어</SubTitle>
      <CustomInput
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        warning={playerName === ""}
      />
      {playerName === "" ? (
        <Warning>플레이어 이름을 입력해주세요.</Warning>
      ) : null}
      <SubTitle>
        캐릭터 목록
        <Icon onClick={addCharacterInput}>
          <MdAddCircle />
        </Icon>
      </SubTitle>
      <CharacterList>
        {characterList.length > 0
          ? characterList.map((character) => {
              const characterInfo = {
                nickname: character.nickname,
                level: character.level,
                class: character.class,
                id: character.id,
                registered: character.registered,
              };
              return (
                <CharacterInput
                  updateCharacterInfo={updateCharacterInfo}
                  characterInfo={characterInfo}
                  delCharacterInput={delCharacterInput}
                  key={characterInfo.id}
                />
              );
            })
          : "캐릭터 정보가 없습니다."}
      </CharacterList>
      <ButtonDiv>
        <CustomButton onClick={handleSubmit}>저장</CustomButton>
        <CustomButton onClick={onClose} delete={true}>
          취소
        </CustomButton>
      </ButtonDiv>
    </Wrapper>
  );
};

export default PlayerForm;

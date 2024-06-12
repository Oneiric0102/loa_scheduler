import styled from "@emotion/styled/macro";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import DelButton from "./DelButton";
import CustomSelect from "./CustomSelect";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 9rem calc(100% - 14rem) 3.5rem;
  grid-gap: 0.5rem;
  width: 100%;
`;
const ParticipantSelection = ({
  players,
  participantInfo,
  updateParticipantInfo,
  delParticipantInput,
}) => {
  const [playerId, setPlayerId] = useState(participantInfo.owner);
  const [characters, setCharacters] = useState([]);
  const [characterId, setCharacterId] = useState(participantInfo.characterId);
  const [beDelete, setBeDelete] = useState(false);
  const id = participantInfo.id;
  const registered = participantInfo.registered;
  const [playerOptions, setPlayerOptions] = useState([]);
  const [characterOptions, setCharacterOptions] = useState([]);

  const changePlayer = (selectedOption) => {
    setPlayerId(selectedOption.value);
    setCharacterId("");
  };

  const changeCharacter = (selectedOption) => {
    setCharacterId(selectedOption.value);
  };

  //초기화 및 캐릭터 선택 시 내용 업데이트
  useEffect(() => {
    updateParticipantInfo(id, {
      owner: playerId,
      characterId: characterId,
      id: id,
      registered: registered,
    });
  }, [characterId]);

  //플레이어 옵션 초기화
  useEffect(() => {
    setPlayerOptions(
      players.map((player) => ({
        value: player.id,
        label: player.name,
      }))
    );
  }, [players]);

  const deleteInput = () => {
    delParticipantInput(id, registered, beDelete);
    setBeDelete((current) => !current);
  };

  //플레이어 선택 시 보유 캐릭터 목록 변경
  useEffect(() => {
    getCharacters();
  }, [playerId]);

  //캐릭터목록 변경 후 characterId 재설정 및 characterOption 변경
  useEffect(() => {
    setCharacterOptions(
      characters.map((character) => ({
        value: character.id,
        label: `${character.nickname} (${character.level} ${character.class})`,
      }))
    );
  }, [characters]);

  const getCharacters = async () => {
    if (playerId !== "") {
      const selectedPlayer = players.find((player) => player.id === playerId);

      const charactersQuery = query(
        collection(selectedPlayer.ref, "characters"),
        orderBy("level", "desc")
      );
      const charactersSnapshot = (await getDocs(charactersQuery)).docs;
      let transformedData = [];

      for (const characterSnapshot of charactersSnapshot) {
        transformedData = [
          ...transformedData,
          { ...characterSnapshot.data(), id: characterSnapshot.id },
        ];
      }
      setCharacters(transformedData);
    } else {
      setCharacters([]);
    }
  };

  return (
    <Wrapper>
      <CustomSelect
        value={
          playerId === ""
            ? null
            : playerOptions.find((option) => option.value === playerId)
        }
        onChange={changePlayer}
        placeholder={"플레이어"}
        options={playerOptions}
      />
      <CustomSelect
        value={
          characterId === ""
            ? null
            : characterOptions.find((option) => option.value === characterId)
        }
        onChange={changeCharacter}
        placeholder={
          characters.length > 0
            ? "캐릭터 선택"
            : players.length > 0
            ? "플레이어를 선택해주세요"
            : "플레이어 정보를 입력해주세요"
        }
        options={characterOptions}
      />
      <DelButton
        beDelete={beDelete}
        registered={participantInfo.registered}
        onClick={deleteInput}
      />
    </Wrapper>
  );
};

export default ParticipantSelection;

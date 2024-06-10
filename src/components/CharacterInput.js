import styled from "@emotion/styled/macro";
import { useEffect } from "react";
import { useState } from "react";
import {
  MdDoDisturbOn,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.rowLeftCenter};
  width: 100%;
`;

const CharacterBox = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 0.5rem;
  width: 100%;
`;
const CharacterName = styled.input`
  width: calc(100% - 5rem);
  border: 2px solid transparent;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  font-size: 1rem;
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;
const CharacterInfo = styled.div`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
  width: calc(100%);
`;
const CharacterLevel = styled.input`
  width: calc(50% - 0.25rem);
  border: 2px solid transparent;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  font-size: 1rem;
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;
const CharacterClass = styled.input`
  width: calc(50% - 0.25rem);
  border: 2px solid transparent;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  font-size: 1rem;
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

const Icon = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  color: ${(props) => props.theme.colors.delete};
  &:hover {
    color: ${(props) => props.theme.colors.deleteHover};
  }
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.1s ease-out;
`;

const DelText = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  cursor: pointer;
  width: 2rem;
  font-size: 1rem;
  color: black;
`;

export default function CharacterInput({
  characterInfo,
  delCharacterInput,
  updateCharacterInfo,
}) {
  const [nickname, setNickname] = useState(characterInfo.nickname);
  const [level, setLevel] = useState(characterInfo.level);
  const [characterClass, setCharacterClass] = useState(characterInfo.class);
  const [beDelete, setBeDelete] = useState(false);
  const id = characterInfo.id;
  const registered = characterInfo.registered;

  useEffect(() => {
    updateCharacterInfo(id, {
      nickname: nickname,
      level: level,
      class: characterClass,
      id: id,
      registered: registered,
    });
  }, [nickname, level, characterClass]);

  return (
    <CharacterBox>
      <CharacterInfo>
        <CharacterName
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <>
          <Icon
            onClick={() => {
              delCharacterInput(id, registered, beDelete);
              setBeDelete((current) => !current);
            }}
          >
            <DelText>삭제</DelText>
            {registered ? (
              beDelete ? (
                <MdCheckBox />
              ) : (
                <MdCheckBoxOutlineBlank />
              )
            ) : (
              <MdDoDisturbOn />
            )}
          </Icon>
        </>
      </CharacterInfo>
      <CharacterInfo>
        <CharacterLevel
          placeholder="레벨"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <CharacterClass
          placeholder="직업"
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
        />
      </CharacterInfo>
    </CharacterBox>
  );
}

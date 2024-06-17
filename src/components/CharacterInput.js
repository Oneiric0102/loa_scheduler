import styled from "@emotion/styled/macro";
import { useEffect } from "react";
import { useState } from "react";
import DelButton from "./DelButton";
import CustomSelect from "./CustomSelect";
import { useMobileContext } from "../context/MobileContext";

const CharacterBox = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 0.5rem;
  width: 100%;
`;
const CharacterName = styled.input`
  width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 5rem)")};
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
const RowWrapper = styled.div`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
  width: 100%;
`;

const MobileWrapper = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 0.5rem;
  width: 100%;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  width: 100%;
`;
const CharacterLevel = styled.input`
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
  ${(props) => (props.isMobile ? "width:100%" : "")};
`;

const SelectContainer = styled.div`
  width: 100%;
`;

const groupCDToString = [
  "",
  "전사",
  "무도가",
  "헌터",
  "마법사",
  "암살자",
  "스페셜리스트",
];

export default function CharacterInput({
  characterInfo,
  delCharacterInput,
  updateCharacterInfo,
  classList,
}) {
  const [nickname, setNickname] = useState(characterInfo.nickname);
  const [level, setLevel] = useState(characterInfo.level);
  const [characterClass, setCharacterClass] = useState(characterInfo.class);
  const [beDelete, setBeDelete] = useState(false);
  const id = characterInfo.id;
  const registered = characterInfo.registered;
  const [classOptions, setClassOptions] = useState([]);
  const isMobile = useMobileContext();

  //클래스리스트 옵션 초기화
  useEffect(() => {
    const groupedData = classList.reduce((result, current) => {
      const groupCD = current["groupCD"];

      if (!result[groupCD]) {
        result[groupCD] = [];
      }

      result[groupCD].push(current);
      return result;
    }, {});

    setClassOptions(
      Object.keys(groupedData).map((groupCD) => ({
        label: groupCDToString[parseInt(groupCD)],
        options: groupedData[groupCD].map((item) => ({
          value: item.name,
          label: item.name,
        })),
      }))
    );
  }, [classList]);

  useEffect(() => {
    updateCharacterInfo(id, {
      nickname: nickname,
      level: level,
      class: characterClass,
      id: id,
      registered: registered,
    });
    console.log(characterClass);
  }, [nickname, level, characterClass]);

  const deleteInput = () => {
    delCharacterInput(id, registered, beDelete);
    setBeDelete((current) => !current);
  };

  const changeClass = (selectedOption) => {
    setCharacterClass(selectedOption.value);
  };
  return (
    <CharacterBox>
      {isMobile ? (
        <MobileWrapper>
          <CharacterName
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isMobile={isMobile}
          />
          <CharacterLevel
            placeholder="레벨"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            isMobile={isMobile}
          />
          <RowWrapper>
            <SelectContainer>
              <CustomSelect
                value={classOptions
                  .flatMap((option) => option.options)
                  .find((option) => option.value === characterClass)}
                onChange={changeClass}
                placeholder={"직업"}
                options={classOptions}
              />
            </SelectContainer>
            <DelButton
              registered={registered}
              beDelete={beDelete}
              onClick={deleteInput}
            />
          </RowWrapper>
        </MobileWrapper>
      ) : (
        <>
          <RowWrapper>
            <CharacterName
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <DelButton
              registered={registered}
              beDelete={beDelete}
              onClick={deleteInput}
            />
          </RowWrapper>
          <GridWrapper>
            <CharacterLevel
              placeholder="레벨"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              isMobile={isMobile}
            />
            <SelectContainer>
              <CustomSelect
                value={classOptions
                  .flatMap((option) => option.options)
                  .find((option) => option.value === characterClass)}
                onChange={changeClass}
                placeholder={"직업"}
                options={classOptions}
              />
            </SelectContainer>
          </GridWrapper>
        </>
      )}
    </CharacterBox>
  );
}

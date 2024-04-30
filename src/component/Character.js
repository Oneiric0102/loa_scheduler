import styled from "@emotion/styled/macro";

const CharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 100%;
  gap: 0.5rem;
`;
const CharacterName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
const CharacterInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 0.5rem;
`;
const CharacterLevel = styled.div`
  font-size: 0.8rem;
`;
const CharacterClass = styled.div`
  font-size: 0.8rem;
  white-space: nowrap;
`;

export default function Character({ characterInfo }) {
  return (
    <CharacterBox>
      <CharacterName>{characterInfo.nickname}</CharacterName>
      <CharacterInfo>
        <CharacterLevel>{characterInfo.level}</CharacterLevel>
        <CharacterClass>{characterInfo.class}</CharacterClass>
      </CharacterInfo>
    </CharacterBox>
  );
}

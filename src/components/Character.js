import styled from "@emotion/styled/macro";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.rowLeftCenter};
  width: 11.5rem;
  flex-shrink: 0;
`;

const Bar = styled.div`
  width: 0.2rem;
  height: 2.3rem;
  border-radius: 0.1rem;
  background-color: ${(props) => props.theme.colors.border};
`;

const CharacterBox = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 0.5rem;
  padding-left: 0.5rem;
`;
const CharacterName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primaryText};
`;
const CharacterInfo = styled.div`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
`;
const CharacterLevel = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.secondaryText};
`;
const CharacterClass = styled.div`
  font-size: 0.8rem;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.secondaryText};
`;

export default function Character({ characterInfo }) {
  return (
    <Wrapper>
      <Bar />
      <CharacterBox>
        <CharacterName>{characterInfo.nickname}</CharacterName>
        <CharacterInfo>
          <CharacterLevel>{characterInfo.level}</CharacterLevel>
          <CharacterClass>{characterInfo.class}</CharacterClass>
        </CharacterInfo>
      </CharacterBox>
    </Wrapper>
  );
}

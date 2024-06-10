import styled from "@emotion/styled/macro";

const Wrapper = styled.div``;
const SelectPlayer = styled.select``;
const SelectCharacter = styled.select``;

const CharacterSelection = ({ players }) => {
  return (
    <Wrapper>
      <SelectPlayer disabled={players.length <= 0}>
        {players.length > 0 ? (
          players.map((player) => {
            return (
              <option value={player.id} key={player.id}>
                {player.name}
              </option>
            );
          })
        ) : (
          <option value="nonePlayer">정보없음</option>
        )}
      </SelectPlayer>
      <SelectCharacter></SelectCharacter>
    </Wrapper>
  );
};

export default CharacterSelection;

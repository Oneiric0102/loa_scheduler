import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Character from "./Character";
import { useSnapshot } from "../hooks/useSnapshot";
import styled from "@emotion/styled/macro";
import { MdEdit, MdDelete } from "react-icons/md";
import useModals from "../hooks/useModals";
import { modals } from "./Modals";
import { db } from "../firebase";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnCenterTop};
  gap: 1rem;
  width: 13.5rem;
`;

const Characters = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  border-radius: 1rem;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  padding: 1rem;
  width: calc(100% - 2rem);
`;

const PlayerName = styled.div`
  ${(props) => props.theme.flex.rowBetweenCenter};
  font-size: 1rem;
  font-weight: bold;
  width: calc(100% - 1rem);
  padding: 0 0.5rem;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) => props.theme.colors.primary};
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

export default function Player({ player }) {
  const charactersQuery = query(
    collection(player.ref, "characters"),
    orderBy("level", "desc")
  );
  const characters = useSnapshot(charactersQuery);
  const { openModal } = useModals();

  const openPlayerModal = () => {
    openModal(modals.player, {
      player: player,
      characters: characters,
    });
  };

  const deletePlayer = async () => {
    if (window.confirm("플레이어를 삭제하시겠습니까?")) {
      deleteDoc(doc(db, "players", player.id));
    }
  };

  return (
    <>
      <Wrapper>
        <PlayerName>
          {player.name}
          <Icons>
            <Icon onClick={openPlayerModal}>
              <MdEdit />
            </Icon>
            <Icon onClick={deletePlayer}>
              <MdDelete />
            </Icon>
          </Icons>
        </PlayerName>
        <Characters>
          {characters.length > 0 ? (
            characters.map((character) => {
              const characterInfo = {
                nickname: character.nickname,
                level: character.level,
                class: character.class,
              };
              return (
                <Character
                  characterInfo={characterInfo}
                  key={character.id}
                  editable={true}
                />
              );
            })
          ) : (
            <NullDiv>캐릭터 정보가 없습니다.</NullDiv>
          )}
        </Characters>
      </Wrapper>
    </>
  );
}

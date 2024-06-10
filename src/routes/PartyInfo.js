import styled from "@emotion/styled/macro";
import RowScroll from "../components/RowScroll";
import { MdAddCircle } from "react-icons/md";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSnapshot } from "../hooks/useSnapshot";
import Player from "../components/Player";
import useModals from "../hooks/useModals";
import { modals } from "../components/Modals";

const TitleDiv = styled.div`
  ${(props) => props.theme.flex.rowBetweenCenter};
`;

const SubTitle = styled.h2`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) => props.theme.colors.primaryText};
`;

const NullDiv = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  width: 13.5rem;
  min-height: 12rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.secondaryText};
  flex-shrink: 0;
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

export default function PartyInfo() {
  const partyQuery = query(collection(db, "parties"), orderBy("createdAt"));
  const party = useSnapshot(partyQuery);

  const playersQuery = query(collection(db, "players"), orderBy("createdAt"));
  const players = useSnapshot(playersQuery);

  const { openModal } = useModals();

  const addPlayer = () => {
    openModal(modals.player, {
      player: { name: "" },
      characters: [
        {
          nickname: "",
          level: "",
          class: "",
          id: -1,
          registered: false,
        },
      ],
    });
  };

  const addParty = () => {
    openModal(modals.party, {
      players: players,
    });
  };

  return (
    <>
      <SubTitle>
        파티 리스트
        <Icon>
          <MdAddCircle onClick={addParty} />
        </Icon>
      </SubTitle>

      <RowScroll>
        {party.length > 0 ? (
          <div>파티정보</div>
        ) : (
          <NullDiv>파티 정보가 없습니다.</NullDiv>
        )}
      </RowScroll>

      <SubTitle>
        캐릭터 리스트
        <Icon onClick={addPlayer}>
          <MdAddCircle />
        </Icon>
      </SubTitle>
      <RowScroll>
        {players.length > 0 ? (
          players.map((player) => {
            return <Player player={player} key={player.id} />;
          })
        ) : (
          <NullDiv>플레이어 정보가 없습니다.</NullDiv>
        )}
      </RowScroll>
    </>
  );
}

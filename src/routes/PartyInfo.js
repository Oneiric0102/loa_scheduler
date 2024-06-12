import styled from "@emotion/styled/macro";
import RowScroll from "../components/RowScroll";
import { MdAddCircle } from "react-icons/md";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSnapshot } from "../hooks/useSnapshot";
import Player from "../components/Player";
import useModals from "../hooks/useModals";
import { modals } from "../components/Modals";
import Party from "../components/Party";

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
  const partiesQeury = query(collection(db, "parties"), orderBy("createdAt"));
  const parties = useSnapshot(partiesQeury);

  const playersQuery = query(collection(db, "players"), orderBy("createdAt"));
  const players = useSnapshot(playersQuery);

  const { openModal } = useModals();

  const addPlayer = () => {
    const characterRef = collection(db, "temp");
    const docRef = doc(characterRef);
    openModal(modals.player, {
      player: { name: "" },
      characters: [
        {
          nickname: "",
          level: "",
          class: "버서커",
          id: docRef.id,
          registered: false,
        },
      ],
    });
  };

  const addParty = () => {
    const characterRef = collection(db, "temp");
    const docRef = doc(characterRef);
    openModal(modals.party, {
      players: players,
      party: { name: "" },
      participants: [
        {
          characterId: "",
          id: docRef.id,
          registered: false,
          owner: "",
        },
      ],
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
        {parties.length > 0 ? (
          parties.map((party) => {
            return <Party players={players} party={party} key={party.id} />;
          })
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

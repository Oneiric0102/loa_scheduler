import { collection, orderBy, query } from "firebase/firestore";
import { useSnapshot } from "../hooks/useSnapshot";
import { modals } from "./Modals";
import CharactersBox from "./CharactersBox";
import { deletePlayer } from "../utils";

export default function Player({ player }) {
  const charactersQuery = query(
    collection(player.ref, "characters"),
    orderBy("level", "desc")
  );
  const characters = useSnapshot(charactersQuery);

  const modalProps = { player: player, characters: characters };

  const onClickDelete = () => {
    if (window.confirm("플레이어를 삭제하시겠습니까?")) {
      deletePlayer(player.id);
    }
  };

  return (
    <CharactersBox
      title={player.name}
      characters={characters}
      modalRef={modals.player}
      modalProps={modalProps}
      deleteFn={onClickDelete}
      nullStr="캐릭터 정보가 없습니다."
    />
  );
}

import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSnapshot } from "../hooks/useSnapshot";
import { modals } from "./Modals";
import { db } from "../firebase";
import CharactersBox from "./CharactersBox";

export default function Player({ player }) {
  const charactersQuery = query(
    collection(player.ref, "characters"),
    orderBy("level", "desc")
  );
  const characters = useSnapshot(charactersQuery);

  const modalProps = { player: player, characters: characters };

  const deletePlayer = () => {
    if (window.confirm("플레이어를 삭제하시겠습니까?")) {
      deleteDoc(doc(db, "players", player.id));
    }
  };

  return (
    <CharactersBox
      title={player.name}
      characters={characters}
      modalRef={modals.player}
      modalProps={modalProps}
      deleteFn={deletePlayer}
      nullStr="캐릭터 정보가 없습니다."
    />
  );
}

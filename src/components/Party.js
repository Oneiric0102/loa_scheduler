import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useSnapshot } from "../hooks/useSnapshot";
import { modals } from "./Modals";
import { db } from "../firebase";
import CharactersBox from "./CharactersBox";
import { useEffect, useState } from "react";

export default function Party({ players, party }) {
  const participantsQuery = query(collection(party.ref, "participants"));
  const participants = useSnapshot(participantsQuery);
  const [participantList, setParticipantList] = useState([]);

  const modalProps = {
    players: players,
    party: party,
    participants: participants,
  };

  const deleteParty = () => {
    if (window.confirm("파티를 삭제하시겠습니까?")) {
      deleteDoc(doc(db, "parties", party.id));
    }
  };

  const getParticipantInfo = async (playerId, characterId) => {
    console.log(playerId);
    console.log(characterId);
    const characterDocRef = doc(
      db,
      "players",
      playerId,
      "characters",
      characterId
    );

    try {
      const characterDocSnapshot = await getDoc(characterDocRef);

      if (characterDocSnapshot.exists()) {
        return { ...characterDocSnapshot.data(), id: characterDocSnapshot.id };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticipantsData = async (participants) => {
    const promises = participants.map((participant) =>
      getParticipantInfo(participant.owner, participant.characterId)
    );

    const participantsData = await Promise.all(promises);
    setParticipantList(participantsData);
  };
  useEffect(() => {
    if (participants.length > 0) {
      fetchParticipantsData(participants);
    }
  }, [participants]);

  return (
    <CharactersBox
      title={party.name}
      characters={participantList}
      modalRef={modals.party}
      modalProps={modalProps}
      deleteFn={deleteParty}
      nullStr="파티 정보가 없습니다."
    />
  );
}

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function usePartyInfo(participants) {
  const [participantList, setParticipantList] = useState([]);

  const getParticipantInfo = async (playerId, characterId) => {
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
    if (
      participants !== null &&
      participants !== undefined &&
      participants.length > 0
    ) {
      fetchParticipantsData(participants);
    }
  }, [participants]);

  return participantList;
}

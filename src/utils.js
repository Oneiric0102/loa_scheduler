import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const deleteParty = async (partyId) => {
  try {
    const scheduleCollectionRef = collection(db, "schedule");
    const scheduleQuerySnapshot = await getDocs(scheduleCollectionRef);

    scheduleQuerySnapshot.forEach(async (doc) => {
      const dayScheduleCollectionRef = collection(doc.ref, "daySchedules");
      const dayScheduleQuerySnapshot = await getDocs(dayScheduleCollectionRef);

      dayScheduleQuerySnapshot.forEach(async (dayScheduleDoc) => {
        if (dayScheduleDoc.data().party === partyId) {
          console.log(dayScheduleDoc.data().party);
          await deleteDoc(dayScheduleDoc.ref);
        }
      });
    });

    deleteDoc(doc(db, "parties", partyId));
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

const deleteCharacter = async (playerId, characterId) => {
  try {
    const partiesCollectionRef = collection(db, "parties");
    const partiesQuerySnapshot = await getDocs(partiesCollectionRef);

    partiesQuerySnapshot.forEach(async (doc) => {
      const participantsCollectionRef = collection(doc.ref, "participants");
      const participantsQuerySnapshot = await getDocs(
        participantsCollectionRef
      );
      participantsQuerySnapshot.forEach(async (participantDoc) => {
        if (
          participantDoc.data().owner === playerId &&
          participantDoc.data().characterId === characterId
        ) {
          await deleteDoc(participantDoc.ref);
        }
      });
    });

    deleteDoc(doc(db, "players", playerId, "characters", characterId));
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

const deletePlayer = async (playerId) => {
  try {
    const playerRef = doc(db, "players", playerId);
    const charactersCollectionRef = collection(playerRef, "characters");
    const charactersSnapshot = await getDocs(charactersCollectionRef);

    charactersSnapshot.forEach(async (doc) => {
      deleteCharacter(playerId, doc.id);
    });

    deleteDoc(doc(db, "players", playerId));
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

export { deleteParty, deleteCharacter, deletePlayer };

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
import { usePartyInfo } from "../hooks/usePartyInfo";
import { deleteParty } from "../utils";

export default function Party({ players, party }) {
  const participantsQuery = query(collection(party.ref, "participants"));
  const participants = useSnapshot(participantsQuery);
  const participantList = usePartyInfo(participants);

  const modalProps = {
    players: players,
    party: party,
    participants: participants,
  };

  const onClickDelete = () => {
    if (window.confirm("파티를 삭제하시겠습니까?")) {
      deleteParty(party.id);
    }
  };

  return (
    <CharactersBox
      title={party.name}
      characters={participantList}
      modalRef={modals.party}
      modalProps={modalProps}
      deleteFn={onClickDelete}
      nullStr="캐릭터 정보가 없습니다."
    />
  );
}

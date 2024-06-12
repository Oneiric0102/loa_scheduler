import React, { useContext } from "react";
import {
  ModalsDispatchContext,
  ModalsStateContext,
} from "../context/ModalsContext";
import styled from "@emotion/styled/macro";
import ReactModal from "react-modal";
import PlayerForm from "./PlayerForm";
import { useEffect } from "react";
import { useState } from "react";
import PartyForm from "./PartyForm";

export const modals = {
  player: PlayerForm,
  party: PartyForm,
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "40rem",
    maxWidth: "80%",
    overflowY: "hidden",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    border: "none",
    borderRadius: "1rem",
  },
};

const ModalInner = styled.form`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${(props) => props.maxHeight};
  padding: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.2rem; /* 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.theme.colors.scrollTrack}; /* 스크롤바 트랙의 배경색 */
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.colors.scrollThumb}; /* 스크롤바 썸의 배경색 */
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.theme.colors.primary40}; /* 스크롤바 썸에 호버될 때의 배경색 */
  }
`;

const getMaxHeight = () => {
  const remValue = window.getComputedStyle(document.documentElement).fontSize;
  const rem32 = 32 * remValue;
  const vh60 = window.innerHeight * 0.6;
  return rem32 < vh60 ? `${32 * remValue}px` : "60vh";
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);
  const [maxHeight, setMaxHeight] = useState(getMaxHeight());

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(getMaxHeight());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;
    const onClose = (e) => {
      close(Component);
    };

    const handleSubmit = () => {
      if (typeof onSubmit === "function") {
        onSubmit();
      }
      onClose();
    };

    return (
      <ReactModal key={index} isOpen style={modalStyles}>
        <ModalInner maxHeight={maxHeight}>
          <Component {...restProps} onClose={onClose} onSubmit={handleSubmit} />
        </ModalInner>
      </ReactModal>
    );
  });
};

export default Modals;

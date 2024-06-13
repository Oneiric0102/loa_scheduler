import Character from "./Character";
import styled from "@emotion/styled/macro";
import { MdEdit, MdDelete } from "react-icons/md";
import useModals from "../hooks/useModals";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnCenterTop};
  gap: 1rem;
  width: 13.5rem;
  flex-shrink: 0;
`;

const Characters = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  border-radius: 1rem;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.surface};
  padding: 1rem;
  width: calc(100% - 2rem);
  white-space: nowrap;
`;

const Title = styled.div`
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

export default function CharactersBox({
  title,
  characters,
  modalRef,
  modalProps,
  deleteFn,
  nullStr,
}) {
  const { openModal } = useModals();

  const editModalOpen = () => {
    openModal(modalRef, modalProps);
  };

  return (
    <>
      <Wrapper>
        <Title>
          {title}
          <Icons>
            <Icon onClick={editModalOpen}>
              <MdEdit />
            </Icon>
            <Icon onClick={deleteFn}>
              <MdDelete />
            </Icon>
          </Icons>
        </Title>
        <Characters>
          {characters.length > 0 ? (
            characters.map((character) => {
              const characterInfo = {
                nickname: character.nickname,
                level: character.level,
                class: character.class,
              };
              return (
                <Character characterInfo={characterInfo} key={character.id} />
              );
            })
          ) : (
            <NullDiv>{nullStr}</NullDiv>
          )}
        </Characters>
      </Wrapper>
    </>
  );
}

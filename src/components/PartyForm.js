import styled from "@emotion/styled/macro";
import { MdAddCircle } from "react-icons/md";
import CharacterSelection from "./CharacterSelection";
import useModals from "../hooks/useModals";
import { modals } from "./Modals";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnLeftCenter};
  gap: 1rem;
`;
const SubTitle = styled.h2`
  ${(props) => props.theme.flex.rowLeftCenter};
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.font.subTitle};
  color: ${(props) => props.theme.colors.primaryText};
`;
const CustomInput = styled.input`
  width: calc(100% - 1rem);
  border: 2px solid
    ${(props) => (props.warning ? props.theme.colors.delete : "transparent")};
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  font-size: 1rem;
  &:focus {
    border: 2px solid
      ${(props) =>
        props.warning ? props.theme.colors.delete : props.theme.colors.primary};
    outline: none;
  }
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

const CustomButton = styled.button`
  ${(props) => props.theme.flex.rowCenter};
  background-color: ${(props) =>
    props.delete ? props.theme.colors.delete : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  font-size: 1rem;
  width: 3rem;
  height: 2rem;
  border-radius: 0.5rem;
  font-family: ${(props) => props.theme.font.content};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.delete
        ? props.theme.colors.deleteHover
        : props.theme.colors.primaryHover};
  }
`;

const ButtonDiv = styled.div`
  ${(props) => props.theme.flex.rowRightCenter};
  gap: 0.25rem;
  margin-top: 1rem;
  width: 100%;
`;

const PartyForm = ({ onSubmit, onClose, players }) => {
  return (
    <Wrapper>
      <SubTitle>
        캐릭터 목록
        <Icon>
          <MdAddCircle />
        </Icon>
      </SubTitle>
      <CharacterSelection players={players}></CharacterSelection>
      <ButtonDiv>
        <CustomButton onClick={onSubmit}>저장</CustomButton>
        <CustomButton onClick={onClose} delete={true}>
          취소
        </CustomButton>
      </ButtonDiv>
    </Wrapper>
  );
};

export default PartyForm;

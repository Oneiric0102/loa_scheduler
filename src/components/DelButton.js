import styled from "@emotion/styled/macro";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDoDisturbOn,
} from "react-icons/md";

const Icon = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  color: ${(props) => props.theme.colors.delete};
  &:hover {
    color: ${(props) => props.theme.colors.deleteHover};
  }
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.1s ease-out;
`;

const DelText = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  cursor: pointer;
  width: 2rem;
  font-size: 1rem;
  color: black;
`;

const DelButton = ({ registered, beDelete, onClick }) => {
  return (
    <Icon onClick={onClick}>
      <DelText>삭제</DelText>
      {registered ? (
        beDelete ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )
      ) : (
        <MdDoDisturbOn />
      )}
    </Icon>
  );
};

export default DelButton;

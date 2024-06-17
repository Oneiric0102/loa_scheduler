import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LocationBtn = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  font-family: "Freesentation-9Black", "Freesentation-9Black-Local";
  color: ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.secondary};
  padding: 1rem 0;
  border-bottom: ${(props) =>
    props.selected
      ? "1px solid " + props.theme.colors.primary
      : "1px solid transparent"};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  transition: color 0.2s ease-out;
`;

export default function HeaderButton({ id, children, location }) {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const idToString = {
    schedule: "스케줄표",
    party: "파티정보",
  };

  const onClickBtn = () => {
    navigate("/loa_scheduler/" + id);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const currentId = currentPath.split("/").pop(); // assuming the id is the last part of the path

    if (currentId === id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [location, id]);

  return (
    <LocationBtn selected={selected} onClick={onClickBtn}>
      {idToString[id]}
    </LocationBtn>
  );
}

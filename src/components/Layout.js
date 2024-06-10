import { Outlet, useLocation } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import styled from "@emotion/styled/macro";

const Wrapper = styled.div`
  margin: 0 2rem;
`;

const HeaderDiv = styled.header`
  ${(props) => props.theme.flex.rowBetweenBottom};
  margin: 2rem 0;
  @media (max-width: 1000px) {
    ${(props) => props.theme.flex.columnLeftCenter};
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.colors.primaryText};
`;
const ButtonDiv = styled.div`
  ${(props) => props.theme.flex.rowCenter};
  gap: 2rem;
`;

export default function Layout() {
  const location = useLocation();
  return (
    <Wrapper>
      <HeaderDiv>
        <Title>Scheduler</Title>
        <ButtonDiv>
          <HeaderButton id="schedule" location={location} />
          <HeaderButton id="party" location={location} />
        </ButtonDiv>
      </HeaderDiv>
      <Outlet />
    </Wrapper>
  );
}

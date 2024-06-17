import { Outlet, useLocation } from "react-router-dom";
import HeaderButton from "./HeaderButton";
import styled from "@emotion/styled/macro";
import { useEffect } from "react";
import { useMobileContext } from "../context/MobileContext";

const Wrapper = styled.div`
  margin: ${(props) => (props.isMobile ? "0 0.5rem" : "0 2rem")};
`;

const HeaderDiv = styled.header`
  ${(props) =>
    props.isMobile
      ? props.theme.flex.columnLeftCenter
      : props.theme.flex.rowBetweenBottom};
  ${(props) => (props.isMobile ? "gap: 1rem;" : "")};
  margin: 2rem 0;
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
  const isMobile = useMobileContext();
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  return (
    <Wrapper isMobile={isMobile}>
      <HeaderDiv isMobile={isMobile}>
        <Title>Loa Scheduler</Title>
        <ButtonDiv>
          <HeaderButton id="schedule" location={location} />
          <HeaderButton id="party" location={location} />
        </ButtonDiv>
      </HeaderDiv>
      <Outlet />
    </Wrapper>
  );
}

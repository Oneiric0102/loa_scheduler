import styled from "@emotion/styled/macro";

const RowScrollDiv = styled.div`
  ${(props) => props.theme.flex.rowLeftTop};
  overflow-x: auto;
  overflow-y: hidden;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  &::-webkit-scrollbar {
    height: 0.5rem; /* 스크롤바의 높이 */
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

export default function RowScroll({ children }) {
  return <RowScrollDiv>{children}</RowScrollDiv>;
}

import styled from "@emotion/styled/macro";

const RowScrollDiv = styled.div`
  ${(props) => props.theme.flex.rowLeftTop};
  overflow-x: auto;
  overflow-y: hidden;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  &::-webkit-scrollbar {
    height: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.scrollTrack};
    border-radius: 0.1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.scrollThumb};
    border-radius: 0.1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.primary40};
  }
`;

export default function RowScroll({ children }) {
  return <RowScrollDiv>{children}</RowScrollDiv>;
}

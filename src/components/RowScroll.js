import styled from "@emotion/styled/macro";

const RowScrollDiv = styled.div`
  ${(props) => props.theme.flex.rowLeftTop};
  overflow-x: auto;
  overflow-y: hidden;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  &::-webkit-scrollbar {
    height: 0.5rem; /* ��ũ�ѹ��� ���� */
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.theme.colors.scrollTrack}; /* ��ũ�ѹ� Ʈ���� ���� */
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.theme.colors.scrollThumb}; /* ��ũ�ѹ� ���� ���� */
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.theme.colors.primary40}; /* ��ũ�ѹ� �濡 ȣ���� ���� ���� */
  }
`;

export default function RowScroll({ children }) {
  return <RowScrollDiv>{children}</RowScrollDiv>;
}

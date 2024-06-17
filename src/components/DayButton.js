import styled from "@emotion/styled/macro";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  gap: 1rem;
  cursor: ${(props) => (props.isMobile ? "pointer" : "default")};
`;

const Day = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
  font-family: ${(props) => props.theme.font.title};
  border-radius: 50%;
  color: ${(props) =>
    props.selected
      ? props.theme.colors.background
      : props.theme.colors.primaryText};
  background-color: ${(props) =>
    props.selected
      ? props.theme.colors.primary
      : props.today
      ? props.theme.colors.surface
      : "transparent"};
`;

export default function DayButton({ day, selected, onClick, isMobile }) {
  const isToday = parseInt(day) === new Date().getDay();
  const isSelected = parseInt(day) === selected;

  const dayToStr = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };

  return (
    <Wrapper
      selected={isSelected}
      onClick={() => onClick(day)}
      isMobile={isMobile}
    >
      <Day selected={isSelected} today={isToday}>
        {dayToStr[day]}
      </Day>
    </Wrapper>
  );
}

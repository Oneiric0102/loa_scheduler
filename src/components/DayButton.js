import styled from "@emotion/styled/macro";

const Wrapper = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  gap: 1rem;
  ${(props) => (props.isMobile ? "cursor: pointer" : null)};
`;

const Day = styled.div`
  ${(props) => props.theme.flex.columnCenter};
  width: 3rem;
  height: 3rem;
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

const Rally = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.primaryText};
`;

export default function DayButton({ day, selected, onClick, isMobile }) {
  const isToday = parseInt(day) === new Date().getDay();
  const isSelected = parseInt(day) === selected;
  const rally = "08:00PM";

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
      <Rally>{rally}</Rally>
    </Wrapper>
  );
}

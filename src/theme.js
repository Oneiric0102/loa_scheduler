const theme = {
  colors: {
    background: "rgba(255, 255, 255, 1)",
    primary: "rgba(91, 103, 202, 1)",
    primaryHover: "rgba(120, 130, 230, 1);",
    primary40: "rgba(91, 103, 202, 0.4)",
    scrollTrack: "rgba(60, 70, 150, 0.1)",
    scrollThumb: "rgba(60, 70, 150, 0.4)",
    secondary: "rgba(176, 181, 221, 1)",
    surface: "rgba(238, 240, 255, 1)",
    primaryText: "rgba(16, 39, 90, 1)",
    secondaryText: "rgba(154, 168, 199, 1)",
    secondaryTextHover: "rgba(123, 138, 176, 1)",
    border: "rgba(143, 153, 235, 1)",
    delete: "rgba(246, 102, 76, 1)",
    deleteHover: "rgba(236, 125, 102, 1)",
  },
  shadows: {
    normal: "0px 1px 3px 0px rgba(96, 108, 128, 0.05)",
  },
  font: {
    title: `"Freesentation-9Black", "Freesentation-9Black-Local"`,
    subTitle: `"Freesentation-7Bold", "Freesentation-7Bold-Local"`,
    content: `"Pretendard-Regular", "Pretendard-Local"`,
  },
  flex: {
    rowCenter: `
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `,
    rowLeftTop: `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `,
    rowLeftCenter: `
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    `,
    rowBetweenTop: `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    `,
    rowBetweenCenter: `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    rowBetweenBottom: `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    `,
    rowRightCenter: `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `,
    columnCenter: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
    columnLeftCenter: `
      display: flex;
      flex-direction: column;;
      justify-content: center;
      align-items: flex-start;;
    `,
    columnCenterTop: `
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `,
  },
};

export default theme;

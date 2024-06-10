import { css, Global } from "@emotion/react";

const globalStyles = (theme) => css`
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard-Local";
    src: url("./fonts/PretendardVariable.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Freesentation-9Black";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-9Black.woff2")
      format("woff2");
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Freesentation-9Black-Local";
    src: url("./fonts/Freesentation-9Black.ttf") format("truetype");
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Freesentation-7Bold";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-7Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Freesentation-7Bold-Local";
    src: url("./fonts/Freesentation-7Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }

  /* Reset CSS */
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  //기본 배경화면과 폰트 설정
  body {
    background-color: ${theme.colors.background};
    font-family: ${theme.font.content};
    overflow: auto; //스크롤로 인해 window의 width가 변하는것을 막기 위해 고정적으로 스크롤바 생성
  }
  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;
export const GlobalStyle = () => <Global styles={globalStyles} />;

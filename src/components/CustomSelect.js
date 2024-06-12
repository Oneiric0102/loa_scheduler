import { css, useTheme } from "@emotion/react";
import Select from "react-select";

const fadeIn = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(2rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const fadeOut = css`
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(2rem);
    }
  }
`;

const customStyles = (theme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `2px solid ${theme.colors.primary}`
      : "2px solid transparent",
    boxShadow: "none",
    backgroundColor: theme.colors.surface,
    borderRadius: "0.5rem",
    flex: 1,
    "&:hover": {
      borderColor: theme.colors.primary,
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? theme.colors.surface
      : theme.colors.background,
    color: "black",
  }),
  menu: (provided) => ({
    ...provided,
    animation: `${fadeIn} 0.2s ease-in-out`, // fadeIn 애니메이션 적용
  }),
  menuClosed: (provided) => ({
    ...provided,
    animation: `${fadeOut} 0.2s ease-in-out`, // fadeOut 애니메이션 적용
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "0.2rem",
    },
    "::-webkit-scrollbar-track": {
      background: theme.colors.scrollTrack,
      borderRadius: "0.1rem",
    },
    "::-webkit-scrollbar-thumb": {
      background: theme.colors.scrollThumb,
      borderRadius: "0.1rem",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: theme.colors.primary40,
    },
  }),
  groupHeading: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.colors.secondaryText,
    fontSize: "0.8rem",
    paddingBottom: "0.5rem",
  }),
});

const groupBadgeStyles = (theme) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: "2em",
  color: theme.colors.primary,
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
});

const CustomSelect = ({ value, onChange, placeholder, options }) => {
  const theme = useTheme();
  const formatGroupLabel = (data) => (
    <>
      <span>{data.label}</span>
      <span style={groupBadgeStyles(theme)}>{data.options.length}</span>
    </>
  );
  return (
    <Select
      value={value}
      onChange={(selectedOption) => onChange(selectedOption)}
      disabled={options.length <= 0}
      placeholder={placeholder}
      options={options}
      styles={customStyles(theme)}
      menuPortalTarget={document.body}
      formatGroupLabel={formatGroupLabel}
      menuPlacement="auto"
    />
  );
};

export default CustomSelect;

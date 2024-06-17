// MobileContext.js
import { createContext, useContext } from "react";

// 기본값을 false로 설정
const MobileContext = createContext(false);

const useMobileContext = () => useContext(MobileContext);

export { MobileContext, useMobileContext };

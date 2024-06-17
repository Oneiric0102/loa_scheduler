import { useEffect, useState } from "react";
import { MobileContext } from "../context/MobileContext";

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup 이벤트 리스너
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
};

export default MobileProvider;

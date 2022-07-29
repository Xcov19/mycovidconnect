import React from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);

  const handleWindowSizeChange = () => {
    setMobile(!(window.innerWidth >= 768));
  };

  React.useEffect(() => {
    setMobile(!(window.innerWidth >= 768));
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isMobile };
}

import React from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);

  
  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth >= 768 ? false : true);
}

  React.useEffect(() => {
    setMobile(window.innerWidth >= 768 ? false : true);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return { isMobile };
}


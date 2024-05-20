import React, { useRef, useEffect, ReactNode } from "react";
import { ScrollContext } from "./scrollContext";

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export const ScrollProvider = ({ children }) => {
  const locomotiveScroll = useRef(null);

  const scrollToSection = (e, currentLink) => {
    e.preventDefault();
    locomotiveScroll.current.scrollTo(currentLink, {
      duration: 3.7,
      easing: (x) => easeInOutExpo(x),
      offset: -100,
    });
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    locomotiveScroll.current.scrollTo(0, {
      duration: 1.4,
      easing: (x) => easeOutExpo(x),
      offset: 0,
    });
  };

  function stopScrolling() {
    if (locomotiveScroll.current) {
      locomotiveScroll.current.stop();
    }
  }
  
  
  const startScroll = () => {
    if (locomotiveScroll.current) {
      locomotiveScroll.current.start();
    }
  };  

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll.current = new LocomotiveScroll({
        lenisOptions: {
          duration: 1,
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 1,
        },
      });
    })();
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection, scrollToTop, stopScrolling, startScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

import React, { useRef } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export const Footer = () => {
  const footerRef = useRef();
  const footerWrapperRef = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // setTimeout(() => {
      gsap.set(footerRef.current, { filter: "brightness(0.7)" });
      gsap.to(footerRef.current, {
        filter: "brightness(1)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      
      gsap.set(footerWrapperRef.current, { yPercent: -55, scale: 0.9 });
      gsap.to(footerWrapperRef.current, {
        filter: "brightness(1)",
        yPercent: 55,
        scale: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    // }, 100)
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer__wrapper container" ref={footerWrapperRef}>
        <ul className="footer__top">
          <p>Terms and conditions</p>
          <p>© 2025 Rez Creative Inc.</p>
          <p>Mady by TWID</p>
        </ul>
        <div className="footer__logo">
          <Logo color="#000" />
        </div>
      </div>
    </footer>
  );
};

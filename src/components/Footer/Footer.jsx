/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Footer.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FormSend } from "../Forms/Form/Form";
import { Link } from "react-router-dom";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_FOOTER } from "@/helpers/dataHelpers/linksAPI";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const Footer = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    !isLoading && (
      <>
        {data?.form && <FormSend />}
        <DataProvider url={URL_FOOTER}>
          <FooterContent />
        </DataProvider>
      </>
    )
  );
};

const FooterContent = () => {
  const footerRef = useRef();
  const footerWrapperRef = useRef();
  const footerListRef = useRef();
  const footerWrapperMobileRef = useRef();

  const { data, isLoading } = useContext(DataContext);

  const { scrollYProgress: filterScroll } = useScroll({
    target: footerRef,
    offset: ["30% 100%", "90% 100%"],
    layoutEffect: false,
  });
  const scroll = useSpring(filterScroll, { stiffness: 10, damping: 10 });
  const filter = useTransform(
    scroll,
    [0, 1],
    ["brightness(0.12)", "brightness(1)"]
  );

  const { scrollYProgress: filterScrollMobile } = useScroll({
    target: footerWrapperMobileRef,
    offset: ["30% 100%", "90% 100%"],
    layoutEffect: false,
  });
  const scrollMobile = useSpring(filterScrollMobile, {
    stiffness: 10,
    damping: 10,
  });
  const filterMobile = useTransform(
    scrollMobile,
    [0, 1],
    ["brightness(0.12)", "brightness(1)"]
  );

  const { scrollYProgress: scrollYProgressDesktop } = useScroll({
    target: footerRef,
    offset: ["0% 100%", "100% 100%"],
  });

  const desktopScale = useTransform(scrollYProgressDesktop, [0, 1], [0.95, 1]);
  const yDesktop = useTransform(
    scrollYProgressDesktop,
    [0, 1],
    ["-85%", "55%"]
  );
  const yList = useTransform(scrollYProgressDesktop, [0.7, 1], ["20%", "0%"]);

  const { scrollYProgress: scrollYProgressMobile } = useScroll({
    target: footerWrapperMobileRef,
    offset: ["0% 100%", "100% 100%"],
  });

  const yMobile = useTransform(scrollYProgressMobile, [0, 1], ["-85%", "0%"]);

  return (
    <>
      <motion.footer style={{ filter }} className="footer" ref={footerRef}>
        <motion.div
          style={{ scale: desktopScale, y: yDesktop }}
          className="footer__wrapper container"
          ref={footerWrapperRef}
        >
          <motion.ul
            style={{ y: yList }}
            className="footer__top"
            ref={footerListRef}
          >
            {data.links?.map((currLink, i) => (
              <Link to={currLink.link} className="footer__link" key={i}>
                {currLink.name}
              </Link>
            ))}
            <a className="footer__link">{data.copyright}</a>
            <a href={data.made_by.link} className="footer__link">
              {data.made_by.name}
            </a>
          </motion.ul>
          <div className="footer__logo">
            <Logo color="#000" />
          </div>
        </motion.div>
      </motion.footer>

      <motion.footer
        style={{ filter: filterMobile }}
        className="footer footer--mobile"
        ref={footerWrapperMobileRef}
      >
        <motion.div
          className="footer--mobile__wrapper container"
          style={{ y: yMobile }}
        >
          <a href="/" className="footer__link">
            Terms and conditions
          </a>
          <div className="footer__logo--mobile">
            <LogoForMobile />
          </div>

          <div className="bottom">
            <a className="footer__link">© 2024 Rez Creative Inc.</a>
            <a href="https://twid.studio/en/" className="footer__link">
              Made by TWID
            </a>
          </div>
        </motion.div>
      </motion.footer>
    </>
  );
};

const LogoForMobile = () => (
  <svg viewBox="0 0 1242 644" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="630.484" width="99.6835" height="200.827" fill="black" />
    <rect x="630.567" width="99.6836" height="313.057" fill="black" />
    <path
      d="M1241.74 0L1241.74 90.7642L720.484 90.7642L720.484 -1.76267e-05L1241.74 0Z"
      fill="black"
    />
    <path
      d="M1241.74 111.132L1241.74 201.896L720.484 201.896L720.484 111.132L1241.74 111.132Z"
      fill="black"
    />
    <path
      d="M1241.74 222.289L1241.74 313.053L720.484 313.053L720.484 222.289L1241.74 222.289Z"
      fill="black"
    />
    <rect
      x="1241.77"
      y="330.946"
      width="90.7642"
      height="611.237"
      transform="rotate(90 1241.77 330.946)"
      fill="black"
    />
    <rect
      width="92.1157"
      height="612.388"
      transform="matrix(-0.412797 -0.910823 -0.936102 0.351729 1241.77 421.712)"
      fill="black"
    />
    <rect
      x="1241.77"
      y="553.235"
      width="90.7643"
      height="611.237"
      transform="rotate(90 1241.77 553.235)"
      fill="black"
    />
    <path
      d="M548.648 1.95805e-05L548.648 90.6792L89.752 90.6792L89.752 0L548.648 1.95805e-05Z"
      fill="black"
    />
    <rect y="0.00317383" width="99.5902" height="312.763" fill="black" />
    <rect x="511.336" width="99.5902" height="201.721" fill="black" />
    <path
      d="M570.181 111.033L570.181 201.712L89.8454 201.712L89.8454 111.033L570.181 111.033Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M454.701 312.756H610.827L355.509 120.203L291.982 190.038L454.701 312.756Z"
      fill="black"
    />
  </svg>
);

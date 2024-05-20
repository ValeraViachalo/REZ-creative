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
  const footerMobileRef = useRef();
  const footerListRef = useRef();
  const footerWrapperRef = useRef();
  const footerWrapperMobileRef = useRef();

  const { data, isLoading } = useContext(DataContext);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    ScrollTrigger.refresh(true);

    if (!isLoading) {
      gsap.set(footerRef.current, { filter: "brightness(0.12)" });
      gsap.to(footerRef.current, {
        filter: "brightness(1)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "30% bottom",
          end: "bottom bottom",
          scrub: 4,
        },
      });

      gsap.set(footerMobileRef.current, { filter: "brightness(0.12)" });
      gsap.to(footerMobileRef.current, {
        filter: "brightness(1)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "30% bottom",
          end: "bottom bottom",
          scrub: 4,
        },
      });

      gsap.set(footerWrapperRef.current, { yPercent: -55, scale: 0.95 });
      gsap.to(footerWrapperRef.current, {
        yPercent: 55,
        scale: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.set(footerListRef.current, { yPercent: 80 });
      gsap.to(footerListRef.current, {
        yPercent: 0,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.set(footerWrapperMobileRef.current, { yPercent: -55, scale: 0.95 });
      gsap.to(footerWrapperMobileRef.current, {
        yPercent: 0,
        scale: 1,
        scrollTrigger: {
          trigger: footerMobileRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, [isLoading]);

  return (
    <>
      <footer className="footer" ref={footerRef}>
        <div className="footer__wrapper container" ref={footerWrapperRef}>
          <ul className="footer__top" ref={footerListRef}>
            {data.links?.map((currLink, i) => (
              <Link to={currLink.link} className="footer__link">
                {currLink.name}
              </Link>
            ))}
            <a className="footer__link">{data.copyright}</a>
            <a href={data.made_by.link} className="footer__link">
              {data.made_by.name}
            </a>
          </ul>
          <div className="footer__logo">
            <Logo color="#000" />
          </div>
        </div>
      </footer>

      <footer className="footer footer--mobile" ref={footerMobileRef}>
        <div
          className="footer--mobile__wrapper container"
          ref={footerWrapperMobileRef}
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
              Mady by TWID
            </a>
          </div>
        </div>
      </footer>
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

import { useContext, useEffect, useRef, useState } from "react";

import "./Form.scss";
import { Socials } from "../Socials/Socials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { GeneralEnquiresForm } from "./General/General";
import { useLocation, useSearchParams } from "react-router-dom";
import { MainForm } from "./Main/Main";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { ApplyVacancyForm } from "./Apply/Apply";

export const FormSend = () => {
  const formRef = useRef();
  const formTitleRef = useRef();
  const formContentRef = useRef();
  const location = useLocation();

  const { data, isLoading } = useContext(DataContext);

  const { pathname } = location;
  const pathVacancy = pathname.split("/");

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom",
        end: "20% bottom",
        scrub: 2,
      },
    });

    gsap.set(formRef.current, {
      scale: 0.9,
    });

    gsap.set(formContentRef.current, {
      scale: 0.85,
    });

    gsap.set(formTitleRef.current, {
      yPercent: 20,
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.to(formContentRef.current, {
      scale: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "30% bottom",
        end: "45% bottom",
        scrub: 2,
      },
    });

    tl.to(formRef.current, {
      scale: 1,
    });

    tl.to(formTitleRef.current, {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
    });
  });

  return (
    !isLoading && (
      <section className="main-form" ref={formRef} id="contact-us">
        <h1 className="super-text" ref={formTitleRef}>
          {data?.form?.title}
        </h1>

        <div className="main-form__content" ref={formContentRef}>
          {pathVacancy[1] === "vacancies" ? (
            pathVacancy[2] ? (
              <ApplyVacancyForm />
            ) : (
              <GeneralEnquiresForm />
            )
          ) : (
            <MainForm />
          )}
          <Socials />
        </div>
      </section>
    )
  );
};

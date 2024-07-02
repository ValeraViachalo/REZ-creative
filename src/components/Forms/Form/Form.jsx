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
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export const FormSend = () => {
  const formRef = useRef();
  const formTitleRef = useRef();
  const formContentRef = useRef();
  const location = useLocation();

  const { data, isLoading } = useContext(DataContext);

  const { pathname } = location;
  const pathVacancy = pathname.split("/");

  const { scrollYProgress: scroll1 } = useScroll({
    target: formRef,
    offset: ["0% 100%", "20% 100%"],
    layoutEffect: false
  });

  const scroll1Smooth = useSpring(scroll1, { stiffness: 100, damping: 25 })

  const scale = useTransform(scroll1Smooth, [0, 1], [0.9, 1]);
  const y = useTransform(scroll1Smooth, [0, 1], ["20%", "0%"]);
  const clipPath = useTransform(scroll1Smooth, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);

  return (
    !isLoading && (
      <motion.section style={{ scale }}  className="main-form" ref={formRef} id="contact-us">
        <motion.h1 style={{ y, clipPath }} className="super-text" ref={formTitleRef}>
          {data?.form?.title}
        </motion.h1>

        <motion.div className="main-form__content" ref={formContentRef}>
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
        </motion.div>
      </motion.section>
    )
  );
};

import React, { useContext, useRef } from "react";
import "./Vacancies.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useInView } from "react-intersection-observer";
import { VacancyAnim } from "@/helpers/anim";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function Vacancies() {
  const presenceAnimRef = useRef();

  const { data, isLoading } = useContext(DataContext);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      presenceAnimRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
  }, [isLoading]);

  return (
    <section className="vacancies container" ref={presenceAnimRef}>
      {!isLoading && (
        <>
          <h1 className="super-text vacancies__title">
            {data.vacancies.title}
          </h1>

          <div className="vacancies__table">
            <div className="top">
              <p className="shadow positions">
                Current positions — {data.vacancies.vacancies.length}
              </p>
              <p className="shadow deadline" data-hide-for-mobile>
                Deadline
              </p>
            </div>

            <ul className="vacancies__list">
              {data.vacancies.vacancies.map((currVac, i) => (
                <li key={i}>
                  <Vacancy vacancy={currVac} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

const Vacancy = ({ vacancy, index }) => {
  const { title, deadline, tag, slug } = vacancy;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  const [sufix, mouth, year] = deadline.month_and_year && deadline.month_and_year.split(" ");
  const shortMouth = mouth && mouth.slice(0, 3);

  return (
    <Link to={slug} className="vacancy" ref={ref}>
      <motion.div
        className="vacancy__content"
        custom={index}
        variants={VacancyAnim.vacancyContent}
        initial="initial"
        animate={inView ? "enter" : "initial"}
      >
        <h2 className="vacancy__title">{title}</h2>
        <p
          className="upperCase semiBold vacancy__deadline"
          data-only-desktop--flex
        >
          <span className="upperCase semiBold">{deadline.day}</span>
          <span>{deadline.month_and_year}</span>
        </p>
        <div className="vacancy__deadline vacancy__deadline-wrapper">
          {deadline.day && deadline.month_and_year && (
            <p className="shadow vacancy__deadline-title" data-only-mobile>
              Deadline
            </p>
          )}
          <p
            className="upperCase semiBold vacancy__deadline"
            data-not-desktop--flex
          >
            <h3 className="upperCase semiBold">{deadline.day}</h3>
            <span>{sufix} {shortMouth} {year}</span>{" "}
          </p>
        </div>
        <span
          className="vacancy__cathegory"
          style={{ borderColor: tag.border_color }}
        >
          {tag.text}
        </span>
      </motion.div>
      <motion.span
        className="vacancy__line"
        custom={index}
        variants={VacancyAnim.line}
        initial="initial"
        animate={inView ? "enter" : "initial"}
      />
    </Link>
  );
};

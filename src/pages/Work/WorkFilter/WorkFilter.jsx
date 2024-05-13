import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import classNames from "classnames";
import { ScrollTrigger } from "gsap/all";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./WorkFilter.scss";
import { ScrollContext } from "@/helpers/scrollContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { anim, WorksListAnim } from "@/helpers/anim";
import { getSearchWith } from "@/helpers/getSearchWith";

export const WorkFilter = ({ worksList, setWorksList }) => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [isFixed, setIsFixed] = useState(false);
  const mainSortList = useRef();
  const fixedSortList = useRef();

  const { data, isLoading } = useContext(DataContext);
  const { scrollToTop } = useContext(ScrollContext);

  const [searchParams] = useSearchParams();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    ScrollTrigger.refresh(true);
  }, [worksList, worksList.length, selectedOption]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainSortList.current,
      start: "bottom top",
      endTrigger: "#works-list",
      end: "bottom bottom",
      scrub: true,
      onUpdate: () => ScrollTrigger.refresh(true),
      onEnter: () => setIsFixed(true),
      onEnterBack: () => setIsFixed(true),
      onLeaveBack: () => setIsFixed(false),
      onLeave: () => setIsFixed(false),
    });
  }, []);

  const handleOptionSelect = (option, event) => {
    scrollToTop(event);

    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    if (option === "all") {
      setWorksList(data.works);
    } else {
      setWorksList(
        data.works.filter((work) =>
          Object.values(work.categories).some(
            (category) => category.slug === option
          )
        )
      );
    }

    setSelectedOption(option);
  };

  return (
    <>
      <ul className="works-filter" ref={mainSortList}>
        <li
          className={classNames("works-filter__item", {
            "works-filter__item--active": selectedOption === "all",
          })}
        >
          <Link
            to={{
              search: getSearchWith(searchParams, { ["filter"]: "all" }),
            }}
            onClick={(event) => handleOptionSelect("all", event)}
          >
            All
          </Link>
        </li>
        {Object.values(data.categories).map((category, i) => (
          <li
            key={`works-filter-${category.name}-${i}`}
            className={classNames("works-filter__item", {
              "works-filter__item--active": selectedOption === category.slug,
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, {
                  ["filter"]: category.slug,
                }),
              }}
              onClick={(event) => handleOptionSelect(category.slug, event)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        <motion.ul
          className="works-filter works-filter--fixed"
          ref={fixedSortList}
          variants={WorksListAnim.filterMenu}
          animate={isFixed ? "animate" : "exit"}
          data-only-desktop--flex
        >
          <li
            className={classNames("works-filter__item", {
              "works-filter__item--active": selectedOption === "all",
            })}
          >
            <Link
              to={{
                search: getSearchWith(searchParams, { ["filter"]: "all" }),
              }}
              onClick={(event) => handleOptionSelect("all", event)}
            >
              All
            </Link>
          </li>
          {Object.values(data.categories).map((category, i) => (
            <li
              key={`works-filter-${category.name}-${i}`}
              className={classNames("works-filter__item", {
                "works-filter__item--active": selectedOption === category.slug,
              })}
            >
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ["filter"]: category.slug,
                  }),
                }}
                onClick={(event) => handleOptionSelect(category.slug, event)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </>
  );
};

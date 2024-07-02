import { PageTransition, anim } from "@/helpers/anim";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./PageLayout.scss";
import { useLocation, useSearchParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactPlayer from "react-player";
import {
  URL_HEADER,
  URL_HOME_DATA,
  URL_WORKS_DETAILS,
} from "@/helpers/dataHelpers/linksAPI";
import { PopUpVideo } from "../PopUpVideo/PopUpVideo";

const colors = ["#ff7215", "#82c5ff", "#feb200", "#d333ea", "#00A79D"];

export const PageLayout = ({ children }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isWorkDetails, setIsWorkDetails] = useState(false);
  const [urlWorks, setUrlWorks] = useState();

  const location = useLocation();
  const { pathname } = location;

  const pathWorks = pathname.split("/");

  const { data, isLoading } = useContext(DataContext);

  const lastPickedColors = useRef([]);

  function getRandomColor() {
    let color;
    do {
      color = colors[Math.floor(Math.random() * colors.length)];
    } while (lastPickedColors.current.includes(color));

    lastPickedColors.current.push(color);
    if (lastPickedColors.current.length > 2) {
      lastPickedColors.current.shift();
    }

    return color;
  }

  const slideColor = getRandomColor();

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);

      setTimeout(() => {
        setIsHomePage(false);
      }, 1550);
    }
    if (pathname.startsWith("/work/") && pathname !== "/work") {
      setIsWorkDetails(true);
      setUrlWorks(URL_WORKS_DETAILS + pathWorks[2]);

      setTimeout(() => {
        setIsWorkDetails(false);
      }, 1550);
    }
  }, [location]);

  return (
    <div className="inner">
      <DataProvider url={URL_HEADER}>
        <Header />
      </DataProvider>
      <motion.div
        className="page-slide"
        style={{ borderColor: slideColor }}
        {...anim(PageTransition.slide)}
        custom={isHomePage || isWorkDetails}
      >
        {isHomePage && (
          <DataProvider url={URL_HOME_DATA}>
            <ScreenShotVideo />
          </DataProvider>
        )}
        {isWorkDetails && (
          <DataProvider url={urlWorks}>
            <WorksHeroPrepered />
          </DataProvider>
        )}
      </motion.div>
      <motion.div
        className="page"
        {...anim(PageTransition.perspective)}
        custom={document.body.offsetHeight}
      >
        <PopUpVideo />
        <motion.div {...anim(PageTransition.opacity)}>{children}</motion.div>
        <Footer />
      </motion.div>
    </div>
  );
};

const ScreenShotVideo = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    !isLoading && (
      <ReactPlayer
        autoPlay
        muted
        playsinline
        width="100%"
        height="100%"
        className="video-bg page-slide__video"
        controls={false}
        url={data.hero.timeline_list[0].video}
      />
    )
  );
};

const WorksHeroPrepered = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    data.page.length &&
    data.page?.map((currSection) => {
      return (
        currSection?.type === "hero" && (
          <section className="works-hero works-hero--loader">
            <div className="top">
              <h1 className="top__title">{currSection.data.title}</h1>
            </div>
            <img
              src={currSection.data.image}
              alt="works-hero"
              className="works-hero__bg"
            />
          </section>
        )
      );
    })
  );
};

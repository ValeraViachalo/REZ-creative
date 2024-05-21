import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Loader.scss";
import { motionParametr } from "@/helpers/motionParametr";
import { LoaderContext } from "./LoaderContext";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { endingAnim, linesAnim, numAnim } from "./LoaderAnim";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_HOME_DATA, URL_WORKS_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import ReactPlayer from "react-player";
import WorksHero from "@/pages/WorkDetails/WorksHero/WorksHero";
import { CustomEase } from "gsap/all";

export const Loader = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

  const [isHomePage, setIsHomePage] = useState(false);
  const [isWorkDetails, setIsWorkDetails] = useState(false);
  const [urlWorks, setUrlWorks] = useState();
  const location = useLocation();
  const { pathname } = location;

  const pathWorks = pathname.split("/");

  useLayoutEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);
    } else if (pathname.startsWith("/work/") && pathname !== "/work") {
      setIsWorkDetails(true);
      setUrlWorks(URL_WORKS_DETAILS + pathWorks[2])
    }
  }, [location]);

  const loaderRef = useRef();
  const progressWrapperRef = useRef();
  const progressNumFirst = useRef();
  const progressNumSecond = useRef();
  const imageRef = useRef();
  const linesRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaderFinished(true),
    });

    gsap.set(progressNumSecond.current, {
      yPercent: -80,
    });

    tl.add(numAnim(progressNumFirst.current, progressNumSecond.current), 0);
    tl.add(linesAnim(linesRef.current), 0);
    tl.add(
      endingAnim(
        imageRef.current,
        progressWrapperRef.current,
        linesRef.current[3],
        isHomePage || isWorkDetails
      ),
      "<77%"
    );
  });

  return (
    <AnimatePresence>
      {!loaderFinished && (
        <motion.section {...motionParametr} className="loader" ref={loaderRef}>
          <div className="progress" ref={progressWrapperRef}>
            <div className="progress__num-wrapper">
              <div ref={progressNumFirst} className="progress__num">
                <span>0</span>
                <span>2</span>
                <span>5</span>
                <span>8</span>
                <span>9</span>
              </div>
            </div>
            <div className="progress__num-wrapper">
              <div ref={progressNumSecond} className="progress__num">
                <span>9</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>0</span>
              </div>
            </div>
            <div className="progress__num">%</div>
          </div>
          <div className="loader__lines">
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span className="line" ref={(l) => linesRef.current.push(l)} />
            <span
              className="line line--last"
              ref={(l) => linesRef.current.push(l)}
            >
              <div ref={imageRef} className="line__image-wrapper">
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
              </div>
            </span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
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
        className="video-bg"
        controls={false}
        url={data.hero.timeline_list[0].video}
      />
    )
  );
};

const WorksHeroPrepered = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    !isLoading && (
      <section className="works-hero works-hero--loader">
        <div className="top">
          <h1 className="top__title">
            {data.main.title}
          </h1>
        </div>
        <img src={data.main.image} alt="works-hero" className="works-hero__bg" />
      </section>
    )
  );

}

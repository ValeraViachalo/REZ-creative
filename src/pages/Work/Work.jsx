import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_WORKS_DATA } from "@/helpers/dataHelpers/linksAPI";
import { CardProject } from "@/components/CardProject/CardProject";
import { PageLayout } from "@/components/PageLayout/PageLayout";

import "./Work.scss";
import { WorkFilter } from "./WorkFilter/WorkFilter";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { WorksListAnim } from "@/helpers/anim";
import classNames from "classnames";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";
import { CustomEase } from "gsap/all";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LoaderContext } from "@/components/Loader/LoaderContext";
import { ScrollContext } from "@/helpers/scrollContext";
import { PopUpVideo } from "@/components/PopUpVideo/PopUpVideo";
import { useDocumentTitle } from "@/helpers/useDocumentTitle";

export default function Work() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentTitle('Work | REZ Creative');

  const { loaderFinished } = useContext(LoaderContext);

  return (
    <DataProvider url={URL_WORKS_DATA}>
      <PageLayout>
        {loaderFinished && <WorksList />}
      </PageLayout>
    </DataProvider>
  );
}

const WorksList = () => {
  const { data, isLoading } = useContext(DataContext);
  const [worksList, setWorksList] = useState([]);

  const titleRef = useRef();
  const presenceAnimRef = useRef();

  useEffect(() => {
    if (!isLoading) {
      setWorksList(data.works);
    }
  }, [isLoading, data]);

  gsap.registerPlugin(CustomEase)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      {
        yPercent: 20,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        yPercent: -2,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
        ),
      }
    );

    tl.fromTo(
      presenceAnimRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      },
      "<50%"
    );
  }, [isLoading]);

  return (
    <div className="container work-page">
      <h1 className="super-text work-page__title" ref={titleRef} >{data.title}</h1>
      <div ref={presenceAnimRef}>

        <WorkFilter worksList={worksList} setWorksList={setWorksList} />
        <ul className="works__list" id="works-list">
          <AnimatePresence mode="wait">
            {worksList.map((currWork, i) => (
              <ProjWrapper
                currWork={currWork}
                i={i}
                key={`work-page-list-${i}--${currWork.id}`}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

const ProjWrapper = ({ currWork, i }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const isTouch = useIsTouchDevice();

  return (
    <motion.div
      key={`work-page-list-${i}--${currWork.id}`}
      variants={WorksListAnim.projectCard}
      initial="initial"
      animate={inView ? "animate" : "exit"}
      custom={i}
      className={classNames("work-page__item pixel-card", {
        ["mobile"]: isTouch,
      })}
      ref={ref}
    >
      <CardProject project={currWork} />
    </motion.div>
  );
};

import React, { useContext, useRef, useState } from "react";
import "./Services.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { servicesListAnim } from "@/helpers/anim";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function Services() {
  const servicesRef = useRef();
  const servicesImageRef = useRef();

  const { data, isLoading } = useContext(DataContext);

  const [openService, setOpenService] = useState({
    isActive: false,
    indexActive: null,
  });

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      servicesImageRef.current,
      { scale: 1.3 },
      {
        scale: 0.8,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, [isLoading]);

  const handlerClickedServ = (index) => {
    setOpenService({
      isActive: !(openService.isActive && openService.indexActive === index),
      indexActive: index,
    });
  };

  const mobileServicesClassHandler = (ind) => {
    return classNames("semiBold services-list--top__title", {
      ["services-list--top__title--active"]:
        openService.isActive && openService.indexActive === ind,
    });
  };

  return (
    <section className="services container" ref={servicesRef}>
      {data && !isLoading && (
        <>
          <img
            src={data?.service?.image}
            alt="top services"
            className="services__image"
            ref={servicesImageRef}
          />

          <div className="services__content">
            <h1 className="super-text">{data?.service?.title}</h1>

            <div className="services-list__wrapper services-list__wrapper--top">
              {data?.service?.list_1 &&
                data?.service?.list_1.map((curr, i) => (
                  <div
                    className="services-list services-list--top"
                    key={`services-list__${i}`}
                  >
                    <p
                      className={"semiBold services-list--top__title"}
                      onClick={() => handlerClickedServ(i)}
                    >
                      {curr.title}
                      <span
                        className="services-list__icon"
                        style={{ backgroundImage: `url(${curr.icon})` }}
                      />
                    </p>
                    <ul className="services-list__list smallText shadow">
                      {curr.numeric_list &&
                        curr.numeric_list.map((currServ, index) => (
                          <li key={`services-list__${i}-${index}-item`}>
                            {currServ.text}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
            <div className="services-list__wrapper services-list__wrapper--mobile services-list__wrapper--top ">
              {data?.service?.list_1 &&
                data?.service?.list_1.map((curr, i) => (
                  <div
                    className="services-list services-list--top"
                    key={`services-list__${i}`}
                  >
                    <p
                      className={mobileServicesClassHandler(i)}
                      onClick={() => handlerClickedServ(i)}
                    >
                      {curr.title}
                      <span
                        className="services-list__icon"
                        style={{ backgroundImage: `url(${curr.icon})` }}
                      />
                    </p>
                    <AnimatePresence>
                      <motion.ul
                        variants={servicesListAnim.listPresence}
                        initial="initial"
                        animate={
                          openService.isActive && openService.indexActive === i
                            ? "animate"
                            : "exit"
                        }
                        className="services-list__list smallText shadow"
                      >
                        {curr.numeric_list.map((currServ, index) => (
                          <li key={`services-list__${i}-${index}-item`}>
                            {currServ.text}
                          </li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  </div>
                ))}
            </div>

            <div className="services-list__wrapper services-list--main">
              {data?.service?.list_2 &&
                data?.service?.list_2.map((currServMain, ind) => (
                  <div
                    className="services-list"
                    key={`services-list--main-${ind}`}
                  >
                    <p className="semiBold">{currServMain.title}</p>
                    {currServMain.sublist.map((currSubList, j) => (
                      <span
                        className="smallText shadow services-list__service"
                        key={`${currServMain.title}-${j}`}
                      >
                        {currSubList.text}
                        <span
                          className="services-list__icon"
                          style={{
                            backgroundImage: `url(${currSubList.icon})`,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

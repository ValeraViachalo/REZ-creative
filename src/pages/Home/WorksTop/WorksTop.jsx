import React, { useContext, useRef } from "react";

import "./WorksTop.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function WorksTop() {
  return (
    <>
      <div data-touch-element>
        <WorksTopMobile />
      </div>
      <div data-desktop-element>
        <WorksTopDesktop />
      </div>
    </>
  );
}

const WorksTopMobile = () => {
  const mainRef = useRef();
  const lineWrapperRef = useRef();

  const { data, isLoading } = useContext(DataContext);

  const { scrollYProgress: scrollTitle } = useScroll({
    target: mainRef,
    offset: ["5% 100%", "10% 80%"],
    layoutEffect: false,
  });

  const { scrollYProgress: scrollLine } = useScroll({
    target: lineWrapperRef,
    offset: ["5% 100%", "40% 100%"],
    layoutEffect: false,
  });

  const scaleHadler = (i) => {
    const scrollLineSpring = useSpring(scrollLine, {
      stiffness: 100 + i * 10,
      damping: 10 + 15 * i,
    });
    return useTransform(scrollLineSpring, [0, 1], [0.2, 1]);
  };

  const titleHandlerAnim = (i) => {
    const scrollLineSpring = useSpring(scrollTitle, {
      stiffness: 100 + i * 10,
      damping: 10 + 5 * i,
    });
    return {
      y: useTransform(scrollLineSpring, [0, 1], ["20%", "0%"]),
      clipPath: useTransform(
        scrollLineSpring,
        [0, 1],
        ["inset(0% 0 100% 0)", "inset(0% 0 0% 0)"]
      ),
    };
  };

  return (
    <>
      {!isLoading && (
        <section className="mobile works-top" ref={mainRef}>
          <div className="works-top__title mobile">
            <h1 className="super-text">
              <motion.span
                style={{
                  y: titleHandlerAnim(1).y,
                  clipPath: titleHandlerAnim(1).clipPath,
                }}
              >
                Hyper
              </motion.span>
            </h1>
            <h1 className="super-text">
              <motion.span
                style={{
                  y: titleHandlerAnim(2).y,
                  clipPath: titleHandlerAnim(2).clipPath,
                }}
              >
                Resolution
              </motion.span>
            </h1>
          </div>

          <div className="works-top__lines mobile" ref={lineWrapperRef}>
            <motion.span
              className="works-top__line works-top__line-1"
              style={{ scale: scaleHadler(1) }}
            />
            <motion.span
              className="works-top__line works-top__line-2"
              style={{ scale: scaleHadler(2) }}
            />
            <motion.span
              className="works-top__line works-top__line-3"
              style={{ scale: scaleHadler(3) }}
            />
          </div>
          <h1 className="super-text works-top__final-title mobile">
            {data.works.title_2}
          </h1>
        </section>
      )}
    </>
  );
};

const WorksTopDesktop = () => {
  const mainRef = useRef();
  const finalTitleRef = useRef();
  const titlesRef = useRef([]);
  const lineRef = useRef([]);

  const { data, isLoading } = useContext(DataContext);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    ScrollTrigger.refresh(true);

    if (!isLoading) {
      lineRef.current.forEach((currLine, i) => {
        tl.set(currLine, { scale: 0.4 });

        tl.fromTo(
          currLine,
          {
            scale: 0.3,
          },
          {
            scale: 0.65,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${i}% 75%`,
              end: `${i}% 0%`,
              // start: "top 75%",
              // end: "top 0%",
              // scrub: (i + 1) * 0.2,
              scrub: true,
            },
          }
        );

        tl.fromTo(
          currLine,
          {
            scale: 0.65,
          },
          {
            scale: 1,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${25 + i * 2}% bottom`,
              end: `${40 + i * 2}% top`,
              scrub: true,
            },
          }
        );

        tl.fromTo(
          currLine,
          {
            scale: 1,
          },
          {
            scale: 0.65,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${55 + i * 2}% bottom`,
              end: `${75 + i * 2}% top`,
              // start: "55% bottom",
              // end: "75% top",
              // scrub: (i + 1) * 0.2,
              scrub: true,
            },
          }
        );
      });

      titlesRef.current.forEach((currT, i) => {
        tl.set(currT, {
          clipPath: "inset(0% 0 100% 0)",
          yPercent: 20,
        });

        tl.add(
          gsap.fromTo(
            currT,
            {
              clipPath: "inset(0% 0 100% 0)",
              yPercent: 20,
            },
            {
              clipPath: "inset(0% 0 -5% 0)",
              yPercent: -5,
              ease: "expo.inOut",
              scrollTrigger: {
                trigger: mainRef.current,
                start: "4% 65%",
                end: "4% 30%",
                scrub: 1,
              },
            }
          )
        );

        tl.add(
          gsap.fromTo(
            currT,
            {
              clipPath: "inset(0% 0 -5% 0)",
              yPercent: -5,
            },
            {
              clipPath: "inset(100% 0 20% 0)",
              yPercent: -20,
              ease: "expo.inOut",
              scrollTrigger: {
                trigger: mainRef.current,
                start: "60% bottom",
                end: "70% top",
                scrub: true,
              },
            }
          )
        );
      });

      tl.fromTo(
        finalTitleRef.current,
        {
          opacity: 0,
          yPercent: -50,
        },
        {
          opacity: 1,
          yPercent: -50,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "22% 65%",
            end: "22% 65%",
            scrub: 2,
          },
        }
      );

      tl.fromTo(
        finalTitleRef.current,
        {
          scale: 0.2,
          yPercent: -50,
        },
        {
          scale: 1,
          yPercent: -50,

          ease: "expo.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "60% bottom",
            end: "75% top",
            scrub: 1,
          },
        }
      );
    }
  }, [isLoading]);

  return (
    <section className="works-top">
      {!isLoading && (
        <div className="works-top__main" ref={mainRef}>
          <div className="sticky">
            <div className="works-top__title">
              <h1 className="super-text">
                <span ref={(el) => titlesRef.current.push(el)}>Hyper</span>
              </h1>
              <h1 className="super-text">
                <span ref={(el) => titlesRef.current.push(el)}>Resolution</span>
              </h1>
            </div>

            <h1
              ref={finalTitleRef}
              className="super-text works-top__final-title"
            >
              {data.works.title_2}
            </h1>

            <div className="works-top__lines">
              <span
                className="works-top__line works-top__line-1"
                ref={(el) => lineRef.current.push(el)}
              ></span>
              <span
                className="works-top__line works-top__line-2"
                ref={(el) => lineRef.current.push(el)}
              ></span>
              <span
                className="works-top__line works-top__line-3"
                ref={(el) => lineRef.current.push(el)}
              ></span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";

import "./Loader.scss";
import { motionParametr } from "@/helpers/motionParametr";
import { LoaderContext } from "./LoaderContext";

const numAnim = (first, second) => {
  const tl = gsap.timeline({ repeat: 3, repeatRefresh: true });

  tl.to(first, {
    yPercent: "-=20",
    duration: 1.4,
    ease: "expo.out",
  });

  tl.to(
    second,
    {
      yPercent: "+=20",
      duration: 1.4,
      ease: "expo.out",
    },
    0
  );

  return tl;
};

const linesAnim = (linesArray) => {
  const tl = gsap.timeline({ repeat: 3, repeatRefresh: true });

  linesArray.forEach((currLine) => {
    tl.to(
      currLine,
      {
        width: "+=25%",
        height: "+=25%",
        duration: 1.4,
        ease: "expo.out",
      },
      0
    );
  });

  return tl;
};

const endingAnim = (image, progress, lastLine) => {
  const tl = gsap.timeline();

  tl.to(image, {
    opacity: 1,
    height: "101%",
    duration: 1.4,
    ease: "expo.out",
  })
    .to(
      progress,
      {
        opacity: 0,
        duration: 0.4,
        ease: "expo.out",
      },
      0
    )
    .to(
      lastLine,
      {
        border: 0,
        duration: 0.4,
        ease: "expo.out",
      },
      0
    );

  return tl;
};

export const Loader = () => {
  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

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
        linesRef.current[3]
      ),
      "<77%"
    );
  });

  return (
    !loaderFinished && (
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
        <div className="lines">
          <span className="line" ref={(l) => linesRef.current.push(l)} />
          <span className="line" ref={(l) => linesRef.current.push(l)} />
          <span className="line" ref={(l) => linesRef.current.push(l)} />
          <span
            className="line line--last"
            ref={(l) => linesRef.current.push(l)}
          >
            <img src="/media/loaderImage.webp" alt="" ref={imageRef} />
            {/* <video
              loop
              muted
              webkit-playsinline="true"
              playsInline
              ref={imageRef}
            >
              <source src="/media/Video/Trailers.mp4" />
            </video> */}
          </span>
        </div>
      </motion.section>
    )
  );
};

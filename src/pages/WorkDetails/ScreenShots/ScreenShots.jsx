import React, { useEffect, useRef, useState } from "react";
import "./ScreenShots.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import classNames from "classnames";
import ReactPlayer from "react-player";
import LazyLoad from "react-lazyload";

export function ScreenShots({ data }) {
  return (
    <div className="screenshots container">
      <ScreenShotsImages images={data.screenshots} />
    </div>
  );
}

export function ScreenShotsText({ data }) {
  return (
    <div className="screenshots screenshots--text container">
      {data?.text && (
        <span
          className="screenshots__text"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      )}
      <ScreenShotsImages images={data.screenshots} />
    </div>
  );
}

const ScreenShotsImages = ({ images }) => {
  const imageRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (imageRef.current) {
      imageRef.current.forEach((currImg) => {
        gsap.to(currImg, {
          yPercent: -9,
          scrollTrigger: {
            trigger: currImg,
            start: "top bottom",
            end: "90% top",
            scrub: true,
          },
        });
      });
    }
  }, [imageRef]);

  return images.map((currImg, i) => (
    <div className="screenshots__image-wrapper" key={`works-${currImg}--${i}`}>
      <div
        className="screenshots__image-animation"
        ref={(img) => imageRef.current.push(img)}
      >
        <LazyLoad offset={window.innerHeight}>
          <img src={currImg} alt="screenshot" className="screenshots__image" />
        </LazyLoad>
      </div>
    </div>
  ));
};

export const ProjectsVideo = ({ data }) => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="container works-trailer video-play-wrapper">
      <div
        className={classNames("video-play", {
          ["video-play--playing"]: isStarted,
        })}
      >
        <ReactPlayer
          controls={true}
          url={data.video}
          playing={isStarted}
          onPause={() => setIsStarted(false)}
          wrapper="video-play-wrapper"
        />
      </div>
      {!isStarted && (
        <div
          className="lines works-trailer__play-btn-wrapper"
          onClick={() => setIsStarted(true)}
        >
          <svg
            viewBox="0 0 26 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="works-trailer__play-btn"
          >
            <path
              d="M26 16L-1.37333e-06 32L0 -1.15754e-06L26 16Z"
              fill="black"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export const FullScreenShot = ({ image }) => {
  const screenShotRef = useRef(null);
  const screenShotRefWrapper = useRef(null);

  useEffect(() => {
    if (screenShotRef.current) {
      gsap.fromTo(
        screenShotRef.current,
        {
          yPercent: -30,
        },
        {
          yPercent: 10,
          scrollTrigger: {
            trigger: screenShotRefWrapper.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, [screenShotRef.current, screenShotRefWrapper.current]);

  return (
    <div className="full-screenShot__wrapper" ref={screenShotRefWrapper}>
      <div className="full-screenShot__anim-wrapper" ref={screenShotRef}>
        <LazyLoad offset={window.innerHeight}>
          <div
            className="full-screenShot"
            style={{ backgroundImage: `url(${image})` }}
          />
        </LazyLoad>
      </div>
    </div>
  );
};

import React, { useContext, useRef } from "react";
import "./ScreenShots.scss";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { VideoPlay } from "@/components/VideoPlay/VideoPlay";
import classNames from "classnames";

export function ScreenShots() {
  const { data, isLoading } = useContext(DataContext);

  console.log(data.media.videos);

  return (
    !isLoading && (
      <>
        {data.media?.screenshots_1 && (
          <div className="screenshots container">
            <ScreenShotsImages images={data.media?.screenshots_1} />
          </div>
        )}
        {data.media.videos && (
          <div className={classNames("container works-trailer", {
            "works-trailer--spacing": !data.media?.screenshots_1
          })}>
            {data.media.videos.map((curV, i) => (
              <VideoPlay
                linkUrl={curV.video}
                buttonText={curV.play_button_text}
                key={`works-trailer-video--${i}`}
              />
            ))}
          </div>
        )}
        {data.media?.screenshots_2 && (
          <div className="screenshots container">
            <ScreenShotsImages images={data.media?.screenshots_2} />
          </div>
        )}
        {data.media.full_screen_image && (
          <FullScreenShot image={data.media.full_screen_image} />
        )}
      </>
    )
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
      <img
        src={currImg}
        alt="screenshot"
        className="screenshots__image"
        ref={(img) => imageRef.current.push(img)}
      />
    </div>
  ));
};

const FullScreenShot = ({ image }) => {
  useGSAP(() => {
    gsap.to(".full-screenShot", {
      backgroundPositionY: "100%",
      scrollTrigger: {
        trigger: ".full-screenShot",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div
      className="full-screenShot"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

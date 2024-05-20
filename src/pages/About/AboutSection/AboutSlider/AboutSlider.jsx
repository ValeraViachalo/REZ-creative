import React, { useContext, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./AboutSlider.scss";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import ReactLenis from "@studio-freight/react-lenis";
import { useDrag } from "react-use-gesture";

export const AboutSlider = () => {
  // const isTouch = useIsTouchDevice();

  // return <>{isTouch ? <AboutSliderMobile /> : <AboutSliderDesktop />}</>;
  return (
    <>
      <div data-touch-element>
        <AboutSliderMobile />
      </div>
      <div data-desktop-element>
        <AboutSliderDesktop />
      </div>
    </>
  );
};

const AboutSliderMobile = () => {
  const { data, isLoading } = useContext(DataContext);
  const sliderRef = useRef();

  const bind = useDrag(({ down, movement: [mx] }) => {
    const slider = sliderRef.current;
    slider.scrollLeft = slider.scrollLeft - mx / 10;
  });

  return (
    <>
      {data && !isLoading && (
        <>
          <div className="about-slider__wrapper touch" {...bind()} ref={sliderRef}>
            <div className="about-slider">
              {data?.about?.slider?.map((currSlide, i) => (
                <div
                  className="about-slider__item"
                  key={`mobile-slide${currSlide.title}-${i}`}
                >
                  <div className="text">
                    <p className="smallText semiBold upperCase">
                      {currSlide.title}
                    </p>
                    <p>{currSlide.text}</p>
                  </div>
                  <img
                    src={currSlide.image}
                    alt="slider"
                    className="about-slider__image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="about-slider__item--sticky">
            <div className="text">
              <h1 className="super-text">{data?.about?.last_slide_title}</h1>
              <p>{data?.about?.last_slide_text}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const AboutSliderDesktop = () => {
  const sliderRef = useRef();
  const wrapperRef = useRef();
  const sliderStickyTitleRef = useRef();
  const sliderImageRef = useRef([]);

  const { data, isLoading } = useContext(DataContext);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {}, [isLoading]);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (!isLoading && sliderImageRef) {
      tl.fromTo(
        sliderRef.current,
        { xPercent: -1 },
        {
          xPercent: -78,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 10%",
            end: "75% bottom",
            scrub: 1,
          },
        }
      );

      sliderImageRef.current.forEach((currImg) => {
        tl.to(
          currImg,
          {
            backgroundPositionX: "160%",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "0 20%",
              end: "75% top",
              scrub: 2,
            },
          },
          0
        );
      });

      tl.fromTo(
        sliderStickyTitleRef.current,
        {
          xPercent: 20,
        },
        {
          xPercent: 0,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "24% 20%",
            end: "45% top",
            scrub: 3,
          },
        }
      );
    }
  }, [isLoading, sliderImageRef]);

  return (
    <div className="about-slider__wrapper" ref={wrapperRef}>
      {data && !isLoading && (
        <div className="about-slider" ref={sliderRef}>
          {data?.about?.slider?.map((currSlide, i) => (
            <div
              className="about-slider__item"
              key={`${currSlide.title}--${i}-desktop`}
            >
              <div className="text">
                <p className="smallText semiBold upperCase">
                  {currSlide.title}
                </p>
                <p>{currSlide.text}</p>
              </div>
              <div
                style={{
                  backgroundImage: `url(${currSlide.image})`,
                }}
                className="about-slider__image"
                ref={(img) => sliderImageRef.current.push(img)}
              />
            </div>
          ))}
          <div
            className="about-slider__item--sticky"
            ref={sliderStickyTitleRef}
          >
            <div className="text">
              <h1 className="super-text">{data?.about?.last_slide_title}</h1>
              <p>{data?.about?.last_slide_text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

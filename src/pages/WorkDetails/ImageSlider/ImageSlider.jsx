import React, { useContext } from "react";
import { Pixelify } from "react-pixelify";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "./ImageSlider.scss";
import "@splidejs/react-splide/css/core";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export const ImageSlider = () => {
  const { data, isLoading } = useContext(DataContext);

  return (
    !isLoading && (
      <div className="works-slider">
        <Splide
          options={{
            rewind: true,
            rewindByDrag: true,
            updateOnMove: true,
            padding: "4vw",
            width: "100%",
            perMove: 2,
            speed: 500,
            perPage: 2,
            pagination: false,
            slideFocus: true,
            keyboard: true,
            classes: {
              arrows: "slider__arrows",
              arrow: "slider__arrow",
              prev: "slider__arrow--prev",
              next: "slider__arrow--next",
            }
          }}
          hasTrack={false}
        >
          <SplideTrack>
            {[...Array(4)].map((_, index) => (
              <SplideSlide key={index} className="slide">
                <img
                  src={`/media/Work/Slider/${index + 1}.jpg`}
                  className="slide__image"
                />
                <Pixelify
                  src={`/media/Work/Slider/${index + 1}.jpg`}
                  pixelSize={20}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
          <div className="slider-free" data-not-desktop--flex>
            {data.slider.map((currImg, i) => (
              <img src={currImg} alt="slider" className="slider-free__image"/>
            ))}
          </div>
          <div className="bottom container">
            <div className="drager-controller" data-only-desktop--flex>
              <p>Drag slider</p>
              <div className="drager-controller__arrows">
                <div className="left">
                  <svg
                    viewBox="0 0 71 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.069 27.668L33.2246 43.734L28.2666 48.766L-0.00138855 24.494L28.3406 0L33.2246 5.55L14.9177 20.668H70.1367V27.668H14.069Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </div>
                <div className="right">
                  <svg
                    viewBox="0 0 71 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M56.0678 27.668L36.9121 43.734L41.8701 48.766L70.1381 24.494L41.7961 0L36.9121 5.55L55.219 20.668H0V27.668H56.0678Z"
                      fill="#F5F5F5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="slider-description">
              <p className="semiBold">{data?.media?.title}</p>
              <p>{data?.media?.text}</p>
            </div>
          </div>
        </Splide>
      </div>
    )
  );
};

import React, { useContext, useEffect, useRef, useState } from "react";
import { Pixelify } from "react-pixelify";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "./ImageSlider.scss";
import "@splidejs/react-splide/css/core";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { Pixelize } from "@/components/Pixelize/Pixelize";
import { useDrag } from "react-use-gesture";

export const MiniImageSlider = ({ data }) => {
  const sliderMobileRef = useRef();

  const bind = useDrag(({ down, movement: [mx] }) => {
    const slider = sliderMobileRef.current;
    slider.scrollLeft = slider.scrollLeft - mx / 10;
  });

  return (
    <div className="works-slider">
      {data.topTitle && (
        <h1 className="works-slider__title">{data.topTitle}</h1>
      )}
      <Splide
        options={{
          rewind: true,
          rewindByDrag: true,
          updateOnMove: true,
          padding: "4vw",
          width: "100%",
          perMove: 1,
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
          },
        }}
        hasTrack={false}
      >
        <SplideTrack data-only-desktop>
          {data.images &&
            data.images.map((currImg, index) => (
              <SplideSlide key={index} className="slide">
                <img src={currImg} className="slide__image" />
                <Pixelize imageUrl={currImg} pixelSize={18} />
              </SplideSlide>
            ))}
        </SplideTrack>
        <div
          className="slider-free"
          data-not-desktop--flex
          {...bind()}
          ref={sliderMobileRef}
        >
          {data.images &&
            data.images.map((currImg, i) => (
              <img
                src={currImg}
                alt="slider"
                className="slider-free__image"
                key={i}
              />
            ))}
        </div>
        <div className="bottom container">
          {data && (
            <div className="drager-controller" data-hide-for-mobile--flex>
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
          )}
          {data.bottom && (
            <div className="slider-description">
              {data.bottom.title && (
                <p className="semiBold">{data.bottom.title}</p>
              )}
              {data.bottom.text && (
                <p dangerouslySetInnerHTML={{ __html: data.bottom.text }} />
              )}
            </div>
          )}
        </div>
      </Splide>
    </div>
  );
};

export const BigImageSlider = ({ data }) => {
  const sliderMobileRef = useRef();

  const bind = useDrag(({ down, movement: [mx] }) => {
    const slider = sliderMobileRef.current;
    slider.scrollLeft = slider.scrollLeft - mx / 10;
  });

  return (
    <div className="works-slider works-slider--fullscreen">
      {data.topTitle && (
        <h1 className="works-slider__title">{data.topTitle}</h1>
      )}
      <Splide
        options={{
          rewind: true,
          rewindByDrag: true,
          updateOnMove: true,
          padding: "14vw",
          width: "100%",
          perMove: 1,
          speed: 500,
          perPage: 1,
          pagination: false,
          slideFocus: true,
          keyboard: true,
          classes: {
            arrows: "slider__arrows",
            arrow: "slider__arrow",
            prev: "slider__arrow--prev",
            next: "slider__arrow--next",
          },
        }}
        hasTrack={false}
      >
        <SplideTrack data-only-desktop>
          {data.images &&
            data.images.map((currImg, index) => (
              <SplideSlide key={index} className="slide">
                <img src={currImg} className="slide__image" />
                <Pixelize imageUrl={currImg} pixelSize={18} />
              </SplideSlide>
            ))}
        </SplideTrack>
        <div
          className="slider-free"
          data-not-desktop--flex
          {...bind()}
          ref={sliderMobileRef}
        >
          {data.images &&
            data.images.map((currImg, i) => (
              <img
                src={currImg}
                alt="slider"
                className="slider-free__image"
                key={i}
              />
            ))}
        </div>
        <div className="bottom container">
          {data && (
            <div className="drager-controller" data-hide-for-mobile--flex>
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
          )}
          {data.bottom && (
            <div className="slider-description">
              {data.bottom.title && (
                <p className="semiBold">{data.bottom.title}</p>
              )}
              {data.bottom.text && (
                <p dangerouslySetInnerHTML={{ __html: data.bottom.text }} />
              )}
            </div>
          )}
        </div>
      </Splide>
    </div>
  );
};

export const WindowSlider = ({ data }) => {
  return (
    <div className="window-slider">
      {data.topTitle && (
        <h1 className="works-slider__title">{data.topTitle}</h1>
      )}
      <Splide
        options={{
          type: "loop",
          width: "100%",
          perMove: 1,
          speed: 500,
          perPage: 1,
          keyboard: true,
          slideFocus: true,
          updateOnMove: true,
          classes: {
            arrows: "slider__arrows",
            arrow: "slider__arrow",
            prev: "slider__arrow--prev",
            next: "slider__arrow--next",
            pagination: "slider__pagination", // Клас для контейнера пагінації
            page: "slider__pagination__page", // Клас для кожної сторінки пагінації
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {data.images &&
            data.images.map((currImg, index) => (
              <SplideSlide key={index} className="slide">
                <img src={currImg} className="slide__image" />
              </SplideSlide>
            ))}
        </SplideTrack>
        <div className="splide__arrows slider__arrows">
          <button className="splide__arrow slider__arrow slider__arrow--prev splide__arrow--prev">
            <svg
              viewBox="0 0 71 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="slider__arrow-icon slider__arrow-icon--prev"
            >
              <path
                d="M33.2266 43.734L10.2866 24.494L33.2266 5.55L28.3426 0L0.000564575 24.494L28.2686 48.766L33.2266 43.734Z"
                fill="white"
              />
              <path
                d="M70.1367 20.668H7.13672V27.668H70.1367V20.668Z"
                fill="#FFFEFE"
              />
            </svg>
          </button>
          <button className="splide__arrow slider__arrow slider__arrow--next splide__arrow--next">
            <svg
              viewBox="0 0 71 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="slider__arrow-icon slider__arrow-icon--next"
            >
              <path
                d="M36.9141 43.734L59.8541 24.494L36.9141 5.55L41.7981 0L70.1401 24.494L41.8721 48.766L36.9141 43.734Z"
                fill="white"
              />
              <path d="M0 20.668H63V27.668H0V20.668Z" fill="#FFFEFE" />
            </svg>
          </button>
        </div>
      </Splide>
      <div className="bottom container">
        {data.bottom && (
          <div className="slider-description">
            {data.bottom.title && (
              <p className="semiBold">{data.bottom.title}</p>
            )}
            {data.bottom.text && (
              <p dangerouslySetInnerHTML={{ __html: data.bottom.text }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

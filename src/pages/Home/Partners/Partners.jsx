import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Partners.scss";
import { useGSAP } from "@gsap/react";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

import "@splidejs/react-splide/css/core";


export default function Partners() {
  const { data, isLoading } = useContext(DataContext);
  const [perPage, setPerPage] = useState(0);

  useEffect(() => {
    const updatePerPage = () => {
      const ratio = window.innerWidth / window.innerHeight;

      if (ratio <= 2 / 3) {
        setPerPage(3);
      } else if (ratio > 2 / 3 && ratio <= 15 / 9) {
        setPerPage(4);
      } else {
        setPerPage(5);
      }
    };

    const handleResize = () => {
      updatePerPage();
    };

    // Initial check
    updatePerPage();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    !isLoading && (
      <section className="partners">
        <Splide
          options={{
            type  : 'loop',
            width: "100%",
            perPage,
            easing: "cubic-bezier(.61,-0.01,.36,1)",
            speed: 2000,
            pauseOnHover: false,
            pagination: false,
            slideFocus: true,
            autoplay: true,
            interval: 3000,
            rewind: true,
            keyboard: true,
            drag: false
          }}
          hasTrack={false}
        >
          <SplideTrack>
            {data.partners.logos.map((currLogo, i) => (
              <SplideSlide
              className="partners__item"
              >
                <img
                  alt=""
                  key={`partners-logo--${i}`}
                  className="partners__logo"
                  src={currLogo}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </section>
    )
  );
}

import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import React, { useContext, useRef } from "react";

import "./WorksHero.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, ScrollTrigger } from "gsap/all";
import { LoaderContext } from "@/components/Loader/LoaderContext";

const transition = {
  duration: 0.8,
  delay: 0.85,
}

export default function WorksHero() {
  const { loaderFinished } = useContext(LoaderContext);
  const { data, isLoading } = useContext(DataContext);

  const { hero: heroData } = data;

  const backgroundRef = useRef();
  const titleRef = useRef();
  const topRef = useRef();

  gsap.registerPlugin(CustomEase, ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (!isLoading && loaderFinished) {
      tl.add(
        gsap.fromTo(
          topRef.current,
          {
            clipPath: "inset(0 0 15% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            ...transition,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      tl.add(
        gsap.fromTo(
          titleRef.current,
          {
            yPercent: 70,
            opacity: 0.4,
          },
          {
            yPercent: 0,
            opacity: 1,
            ...transition,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      tl.add(
        gsap.fromTo(
          backgroundRef.current,
          {
            scale: 1,
          },
          {
            scale: 1.1,
            ...transition,
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.17,0 0.308,0.115 0.331,0.155 0.389,0.256 0.391,0.359 0.434,0.555 0.478,0.751 0.661,0.877 0.661,0.877 0.661,0.877 0.794,1 1,1 "
            ),
          }
        ),
        0
      );

      gsap.to(backgroundRef.current, {
        yPercent: 10,
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }
  }, [isLoading, loaderFinished]);

  return (
    !isLoading && (
      <section className="works-hero">
        <div className="top" ref={topRef}>
          <h1 className="top__title" ref={titleRef}>
            {heroData.title}
          </h1>
        </div>
        <img src={heroData.image} alt="works-hero" className="works-hero__bg" ref={backgroundRef}/>
      </section>
    )
  );
}

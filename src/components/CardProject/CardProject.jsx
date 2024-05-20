import React, { useEffect, useState } from "react";
import { Pixelify } from "react-pixelify";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./CardProject.scss";
import { Link, useSearchParams } from "react-router-dom";
import { Pixelize } from "../Pixelize/Pixelize";
import { getSearchWith } from "@/helpers/getSearchWith";
import classNames from "classnames";

const handleUrl = (project, searchParams) => {
  const { video_for_popup, title, slug } = project;

  if (video_for_popup.length) {
    return {
      search: getSearchWith(searchParams, {
        ["popUpVideo"]: project?.video_for_popup,
        ["name"]: title,
      }),
    };
  } else {
    return `/work/${slug}`;
  }
};

export const CardProject = ({ project }) => {
  const isTouch = useIsTouchDevice();

  return (
    <>
      {isTouch ? (
        <CardProjectMobile project={project} />
      ) : (
        <CardProjectDesktop project={project} />
      )}
    </>
  );
};

const CardProjectMobile = ({ project }) => {
  const { img, logo, logo_text } = project;
  const [searchParams] = useSearchParams();

  return (
    <Link to={handleUrl(project, searchParams)} className="pixel-card mobile">
      <img src={img} alt="card-project" className="pixel-card__bg mobile" />
      <div
        className={classNames("pixel-card__logo mobile", {
          "pixel-card__logo--text": logo_text && !logo,
        })}
      >
        {logo && <img src={logo} alt="" className="pixel-card__logo-image" />}
        {logo_text && !logo && (
          <h3 className="semiBold pixel-card__name">{logo_text}</h3>
        )}
      </div>
    </Link>
  );
};

const CardProjectDesktop = ({ project }) => {
  const { img: srcBg, img_hover: srcBgZoomed, logo, logo_text } = project;

  const [pixelSize, setPixelSize] = useState(1);
  const [images, setImages] = useState([srcBg, srcBgZoomed]);
  const [imageIndex, setImageIndex] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = srcBgZoomed;
    preloadImage.onload = () => {
      setImages([srcBg, preloadImage.src]);
    };
  }, [srcBg, srcBgZoomed]);

  const animEnterStepsHandler = () => {
    setPixelSize(16);

    setTimeout(() => {
      setPixelSize(22);
    }, 200);

    setTimeout(() => {
      setPixelSize(1);
      setImageIndex(1);
    }, 400);
  };

  const animLeaveStepsHandler = () => {
    setPixelSize(22);

    setTimeout(() => {
      setPixelSize(16);
    }, 200);

    setTimeout(() => {
      setPixelSize(1);
      setImageIndex(0);
    }, 400);
  };

  return (
    <Link
      to={handleUrl(project, searchParams)}
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelize imageUrl={images[imageIndex]} pixelSize={pixelSize} />
      <div
        className={classNames("pixel-card__logo", {
          "pixel-card__logo--text": logo_text && !logo,
        })}
      >
        {logo && <img src={logo} alt="" className="pixel-card__logo-image" />}
        {logo_text && !logo && (
          <h3 className="semiBold pixel-card__name">{logo_text}</h3>
        )}
      </div>
    </Link>
  );
};

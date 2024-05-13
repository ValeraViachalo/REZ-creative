import React, { useEffect, useState } from "react";
import { Pixelify } from "react-pixelify";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./CardProject.scss";
import { Link, useSearchParams } from "react-router-dom";
import { Pixelize } from "../Pixelize/Pixelize";
import { getSearchWith } from "@/helpers/getSearchWith";

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
  const { slug, img, logo } = project;

  return (
    <Link to={`/work/${slug}`} className="pixel-card mobile">
      <img src={img} alt="card-project" className="pixel-card__bg mobile" />
      <div className="pixel-card__logo mobile">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};

const CardProjectDesktop = ({ project }) => {
  const { slug, img: srcBg, img_hover: srcBgZoomed, logo, type, title } = project;

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

  const handleUrl = () => {
    if (type === "page") {
      return `/work/${slug}`
    } else if (type === "popUp") {
      return {
        search: getSearchWith(searchParams, { ["popUpVideo"]: project?.videoUrl, ["name"]: title })
      }
    }
  }

  return (
    <Link
      // to={`/work/${slug}`}
      to={handleUrl()}
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelize imageUrl={images[imageIndex]} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        {logo.type === "logo" && (
          <img src={logo.url} alt="" className="pixel-card__logo-image" />
        )}
        {logo.type === "text" && (
          <h2 className="semiBold">{logo.text}</h2>
        )}
      </div>
    </Link>
  );
};

const CardProjectDesktop1 = ({ project }) => {
  const { slug, img: srcBg, img_hover: srcBgZoomed, logo } = project;

  const [images, setImages] = useState([srcBg, srcBgZoomed]);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = srcBgZoomed;
    preloadImage.onload = () => {
      setImages([srcBg, preloadImage.src]);
    };
  }, [srcBg, srcBgZoomed]);

  return (
    <Link className="pixel-card pixel-card-new" to={`/work/${slug}`}>
      <Pixelify src={images[0]} pixelSize={0} />
      <Pixelify src={images[0]} pixelSize={18} />
      <Pixelify src={images[0]} pixelSize={28} />
      <Pixelify src={images[1]} pixelSize={0} />
      <div className="pixel-card__logo">
        <img src={logo} alt="" className="pixel-card__logo-image" />
      </div>
    </Link>
  );
};

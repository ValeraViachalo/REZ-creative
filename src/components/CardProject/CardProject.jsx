import React, { useEffect, useState } from "react";
import { Pixelify } from "react-pixelify";
import { useIsTouchDevice } from "@/helpers/isTouchDevice";

import "./CardProject.scss";
import { Link } from "react-router-dom";

export const CardProject = ({ project }) => {
  const isTouch = useIsTouchDevice();

  return (
    <>
      {isTouch ? (
        <CardProjectMobile project={project} />
      ) : (
        <CardProjectDesktop1 project={project} />
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
  const { slug, img: srcBg, img_hover: srcBgZoomed, logo } = project;

  const [pixelSize, setPixelSize] = useState(0);
  const [images, setImages] = useState([srcBg, srcBgZoomed]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = srcBgZoomed;
    preloadImage.onload = () => {
      setImages([srcBg, preloadImage.src]);
    };
  }, [srcBg, srcBgZoomed]);

  const animEnterStepsHandler = () => {
    setPixelSize(18);

    setTimeout(() => {
      setPixelSize(28);
    }, 200);

    setTimeout(() => {
      setPixelSize(0);
      setImageIndex(1); 
    }, 400);
  };

  const animLeaveStepsHandler = () => {
    setPixelSize(28);
    setImageIndex(0); 
    
    setTimeout(() => {
      setPixelSize(18);
    }, 200);
    
    setTimeout(() => {
      setImageIndex(0); 
      setPixelSize(0);
    }, 400);
  };

  return (
    <Link
    to={`/work/${slug}`}
      className="pixel-card"
      onMouseEnter={() => animEnterStepsHandler()}
      onMouseLeave={() => animLeaveStepsHandler()}
    >
      <Pixelify src={images[imageIndex]} pixelSize={pixelSize} />
      <div className="pixel-card__logo">
        <img src={logo} alt="" className="pixel-card__logo-image" />
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


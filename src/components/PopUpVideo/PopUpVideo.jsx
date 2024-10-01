import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./PopUpVideo.scss";
import { VideoPlay } from "../VideoPlay/VideoPlay";
import { AnimatePresence, motion } from "framer-motion";
import { anim, WorksPopUpAnim } from "@/helpers/anim";

export const PopUpVideo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [video, setVideo] = useState();
  const [projectName, setProjectName] = useState();

  useEffect(() => {
    if (searchParams.get("popUpVideo") && searchParams.get("name")) {
      setIsActive(true);
      setVideo(searchParams.get("popUpVideo"));
      setProjectName(searchParams.get("name"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        window.addEventListener("scroll", handleClose);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", handleClose);
      };
    }
  }, [isActive]);

  const handleClose = () => {
    setIsActive(false);
    // Remove the query parameters without changing the base URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("popUpVideo");
    newSearchParams.delete("name");
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div className="pop-up-video" {...anim(WorksPopUpAnim.body)}>
          <span className="close-area" onClick={handleClose} />
          {projectName.length < 40 ? (
            <h1 className="pop-up-video__title">{projectName}</h1>
          ) : (
            <h2 className="pop-up-video__title">{projectName}</h2>
          )}
          <h3 className="pop-up-video__close" onClick={handleClose}>
            Close
          </h3>
          <VideoPlay buttonText="Play trailer" linkUrl={video} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
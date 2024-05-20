import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import "./PopUpVideo.scss";
import ReactPlayer from "react-player";
import { VideoPlay } from "../VideoPlay/VideoPlay";
import { AnimatePresence, motion } from "framer-motion";
import { anim, WorksPopUpAnim } from "@/helpers/anim";

let timeoutId = null;

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

    if (!isActive) {
      searchParams.delete("popUpVideo");
      searchParams.delete("name");
      navigate("?" + searchParams.toString(), { replace: true });
    }
  }, [searchParams, isActive]);

  useEffect(() => {
    if (isActive) {
      const handleScroll = () => {
        setIsActive(false);
      };
  
      const timeoutId = setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
      }, 1000); // Затримка в мілісекундах
  
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isActive]);
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div className="pop-up-video"
        {...anim(WorksPopUpAnim.body)}
        >
          <span className="close-area" onClick={() => setIsActive(false)}/>
          {projectName.length < 40 ? (
            <h1 className="pop-up-video__title">{projectName}</h1>
          ): (
            <h2 className="pop-up-video__title">{projectName}</h2>
          )}
          <h3
            className="pop-up-video__close"
            onClick={() => setIsActive(false)}
          >
            Close
          </h3>
          <VideoPlay buttonText="Play trailer" linkUrl={video} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

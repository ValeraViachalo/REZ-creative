import React from "react";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";

import "./ContentAndText.scss";

export const ContentAndText = ({ data, side = "right" }) => {
  return (
    <section className={`content-and-text container content-and-text--${side}`}>
      {data.image && !data.video && (
        <img
          src={data.image}
          alt="content-and-text-media"
          className="content-and-text__image content-and-text__content"
        />
      )}
      {data.video && (
        <div className="content-and-text__video content-and-text__content">
          <VideoPlayer
            url={data.video}
            customClass="content-and-text__video content-and-text__content"
          />
        </div>
      )}
      <div className="content-and-text__text">
        {data.title && <p className="title semiBold">{data.title}</p>}
        {data.text && (
          <p className="text" dangerouslySetInnerHTML={{ __html: data.text }} />
        )}
      </div>
    </section>
  );
};

import classNames from "classnames";
import React from "react";

import "./TextSections.scss";

export const TextSection = ({ data, position = "left" }) => {
  return (
    <section
      className={classNames("text-section", {
        "text-section--margin": data.blockMargin,
        "text-section--long": data.long,
        "text-section--left": position === "left",
        "text-section--center": position === "center"
      })}
    >
      <h3 className="upperCase semiBold text-section__extra-title">
        {data.extraTitle}
      </h3>
      <p className="semiBold text-section__title">{data.title}</p>
      <p
        className="text-section__text"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    </section>
  );
};

import { CardProject } from "@/components/CardProject/CardProject";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import React, { useContext } from "react";

import './RelatedWorks.scss';

export default function RelatedWorks({ data }) {

  return (
    data.length !== 0 && (
      <section className="related-works container">
        <h1 className="related-works__title">{data.title}</h1>

        <ul className="works__list">
          {data.projects.map((currWorks, i) => (
            <CardProject
              project={currWorks}
              key={i}
            />
          ))}
        </ul>
      </section>
    )
  );
}

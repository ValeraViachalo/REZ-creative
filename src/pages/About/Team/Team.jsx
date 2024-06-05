import React, { useContext } from "react";

import "./Team.scss";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";

export default function Team() {
  const { data, isLoading } = useContext(DataContext);

  return (
    <section className="team container">
      {data && !isLoading && (
        <>
          <h1 className="super-text">{data?.team?.title}</h1>

          <ul className="team__list">
            {data?.team?.team.map((currMember, i) => (
              <li className="team__item" key={`team-member-${i}`}>
                <img
                  src={currMember.image}
                  alt="team Member"
                  className="team__image"
                />
                <div>
                  <p>{currMember.name}</p>
                  <span className="smallText">{currMember.position}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

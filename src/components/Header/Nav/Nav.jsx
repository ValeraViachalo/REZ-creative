import React, { useContext } from "react";
import "./Nav.scss";
import { motion } from "framer-motion";
import { MenuAnim, anim } from "@/helpers/anim";
import { Link } from "react-router-dom";
import AnchorLink from "@/components/AnchorLink/AnchorLink";
import { DataContext } from "@/helpers/dataHelpers/dataProvider";
import classNames from "classnames";

export const Nav = ({ setisActive }) => {
  const { data, isLoading } = useContext(DataContext);

  return (
    <motion.div className="navigation" {...anim(MenuAnim.presenceMenu)}>
      <nav className="navigation__list container">
        {data.left_menu.map((currLink, i) => {
          return (
            <h1 className="navigation__link-wrapper super-text">
              <motion.span
                className={classNames("navigation__link", {
                  "link-with-arrow": currLink.link === "/vacancies",
                })}
                {...anim(MenuAnim.links)}
                custom={[(i + 1) * 0.1, (i + 1) * 0.01]}
                onClick={() => setisActive(false)}
              >
                {currLink.link === "#contact-us" ? (
                  <AnchorLink
                    toSection={currLink.link}
                    key={`left_menu-header--${i}-static`}
                  >
                    {currLink.title}
                  </AnchorLink>
                ) : (
                  <Link to={currLink.link} className="navigation__link">
                    {currLink.title}
                  </Link>
                )}
              </motion.span>
            </h1>
          );
        })}
        {data.right_menu.map((currLink, i) => {
          return (
            <h1 className="navigation__link-wrapper super-text">
              <motion.span
                className={classNames("navigation__link", {
                  "link-with-arrow": currLink.link === "/vacancies",
                })}
                {...anim(MenuAnim.links)}
                custom={[(i + data.left_menu.length) * 0.1, (i + data.left_menu.length) * 0.01]}
                onClick={() => setisActive(false)}
              >
                {currLink.link === "#contact-us" ? (
                  <AnchorLink
                    toSection={currLink.link}
                    key={`left_menu-header--${i}-static`}
                    className="navigation__link"
                  >
                    {currLink.title}
                  </AnchorLink>
                ) : (
                  <Link to={currLink.link} className="navigation__link">
                    {currLink.title}
                  </Link>
                )}
              </motion.span>
            </h1>
          );
        })}
      </nav>

      <motion.div className="socials container" {...anim(MenuAnim.socials)}>
        <p className="shadow">Follow us</p>

        <ul className="socials__list">
          {data?.socials &&
            data?.socials?.links.map((currSocial, i) => (
              <li className="socials__item" key={`socials__item-${i}`}>
                <a href={currSocial.link} target="_blank">
                  <img src={currSocial.icon} alt="socials" />
                </a>
              </li>
            ))}{" "}
        </ul>
      </motion.div>
    </motion.div>
  );
};

import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import React, { createContext } from "react";
import { useQuery } from "react-query";
import { URL_HOME_DATA, URL_WORKS_DATA } from "./linksAPI";

const hero = {
  "timeline_list": [
    {
      "name": "Attack on Titan",
      "category": "Team Deathmatch Trailer",
      "video": "https://app.rezcreative.com/wp-content/uploads/2024/04/AOT.mp4",
      "slug": "attack-on-titan"
    },
    {
      "name": "Alien",
      "category": "CGI Trailer",
      "video": "https://app.rezcreative.com/wp-content/uploads/2024/04/Alien.mp4",
      "slug": false
    },
    {
      "name": "Rainbow Six Siege",
      "category": "Cinematic Trailer",
      "video": "https://app.rezcreative.com/wp-content/uploads/2024/04/Rainbow_six.mp4",
      "slug": "rainbow-six-siege"
    }
  ]
}

const popUpWork = {
    "id": 465,
    "type": "popUp",
    "videoUrl": "https://player.vimeo.com/video/320509988?h=8ee7ebb6f3",
    "title": "UNRULY HEROES",
    "slug": false,
    "img": "https://app.rezcreative.com/wp-content/uploads/2024/05/image-131.webp",
    "img_hover": "https://app.rezcreative.com/wp-content/uploads/2024/05/image-132.webp",
    "logo": {
      "type": "text",
      "text": "UNRULY HEROES"
    },
    // "logo": "https://app.rezcreative.com/wp-content/uploads/2024/05/DBD_STORE_ZODIAC_IRON_MAIDEN_COLLECTION_UNIQUE-LOGO-e1715097821940.png",
    "categories": []
}

const getData = (url) => {
  return fetch(url, {
    cache: "no-cache",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (url === URL_HOME_DATA) {
        return {...data, hero}
      }
      if (url === URL_WORKS_DATA) {
        if (Array.isArray(data.works)) {
          data.works.forEach((currentWork) => {
            const link = currentWork.logo
            currentWork.type = "page"
            currentWork.logo = {
              "type": "logo",
              "url": link,
            }
          });

          data.works.unshift(popUpWork);
        } else {
          console.error('data.works is not an array');
        }
        return data;
      }
      return data;
    });
};

export const DataContext = createContext();

export const DataProvider = ({ children, url }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getData(url),
    queryKey: ["data", url],
  });

  return (
    !isLoading && (
      <>
        {!data ? (
          <ErrorPage />
        ) : (
          <DataContext.Provider value={{ data, isLoading }}>
            {children}
          </DataContext.Provider>
        )}
      </>
    )
  );
};

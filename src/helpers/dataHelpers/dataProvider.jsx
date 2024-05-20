import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import React, { createContext } from "react";
import { useQuery } from "react-query";
import { URL_HOME_DATA, URL_WORKS_DATA } from "./linksAPI";

const getData = (url) => {
  return fetch(url, {
    cache: "no-cache",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data);
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

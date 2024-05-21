import React, { createContext, useState } from "react";

// Створення контексту
export const LoaderContext = createContext();

// Компонент провайдера
export const LoaderProvider = ({ children }) => {
  const [loaderFinished, setLoaderFinished] = useState(false);

  return (
    <LoaderContext.Provider value={{ loaderFinished, setLoaderFinished }}>
      {children}
    </LoaderContext.Provider>
  );
};
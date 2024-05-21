import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLocation, useRoutes } from "react-router-dom";

import { ScrollProvider } from "./helpers/scrollProvider";
import Home from "./pages/Home/Home";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header/Header";
import {
  LoaderContext,
  LoaderProvider,
} from "./components/Loader/LoaderContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import About from "./pages/About/About";
import JoinTeam from "./pages/JoinTeam/JoinTeam";
import Work from "./pages/Work/Work";
import Terms from "./pages/Terms/Terms";
import VacancyDetails from "./pages/VacancyDetails/VacancyDetails";
import WorkDetails from "./pages/WorkDetails/WorkDetails";
import classNames from "classnames";

const queryC = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryC}>
      <ScrollProvider>
        <LoaderProvider>
          <Loader />
          <Root />
        </LoaderProvider>
      </ScrollProvider>
    </QueryClientProvider>
  );
}

const Root = () => {
  const { loaderFinished } = useContext(LoaderContext);

  const element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "work",
          element: <Work />,
        },
        {
          path: "work/:workSlug",
          element: <WorkDetails />,
        },
        {
          path: "vacancies",
          element: <JoinTeam />,
        },
        {
          path: "terms",
          element: <Terms />,
        },
        {
          path: "vacancies/:vacancySlug",
          element: <VacancyDetails />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className={classNames("main", {
          "main--loading": !loaderFinished,
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaderFinished ? 1 : 0 }}
      >
        <AnimatePresence mode="wait">
          {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </motion.main>
    </AnimatePresence>
  );
};

export default App;

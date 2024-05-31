import { PageLayout } from "@/components/PageLayout/PageLayout";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_VACANCY_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "@/styles/global.scss";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useDocumentTitle } from "@/helpers/useDocumentTitle";

export default function VacancyDetails() {
  const [urlDetails, setUrlDetails] = useState();
  const location = useLocation();
  const { pathname } = location;

  const pathVacancy = pathname.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    setUrlDetails(URL_VACANCY_DETAILS + pathVacancy[2]);
  }, []);

  return (
    <DataProvider url={urlDetails}>
      <PageLayout>
        <main className="vacancy-details dynamickPage container">
          <VacancyDetailBody />
        </main>
      </PageLayout>
    </DataProvider>
  );
}

const VacancyDetailBody = () => {
  const { data, isLoading } = useContext(DataContext);

  useDocumentTitle(data?.hero?.title && `${data?.hero?.title} | REZ Creative`);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [isLoading]);

  return !isLoading && (
    <section>
      {!isLoading && (
        <>
          <Link to="/vacancies" className="link-with-arrow">
            Back to all vacancies
          </Link>
          <h1 className="dynamickPage__title">{data?.hero?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data?.hero?.text }} />
        </>
      )}
    </section>
  );
};

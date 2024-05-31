import { PageLayout } from "@/components/PageLayout/PageLayout";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_WORKS_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorksHero from "./WorksHero/WorksHero";
import WorkDescriptions from "./WorkDescriptions/WorkDescriptions";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { ScreenShots } from "./ScreenShots/ScreenShots";
import RelatedWorks from "./RelatedWorks/RelatedWorks";

import './WorkDetails.scss';
import { useDocumentTitle } from "@/helpers/useDocumentTitle";

export default function WorkDetails() {
  const [urlDetails, setUrlDetails] = useState();
  const location = useLocation();
  const { pathname } = location;

  const pathWorks = pathname.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    setUrlDetails(URL_WORKS_DETAILS + pathWorks[2]);
  }, []);

  return (
    <DataProvider url={urlDetails}>
      <PageLayout>
        <Title />
        <main className="work-details">
          <WorksHero />
          <WorkDescriptions />
          <ImageSlider />
          <ScreenShots />
          <RelatedWorks />
        </main>
      </PageLayout>
    </DataProvider>
  );
}

const Title = () => {
  const { data, isLoading } = useContext(DataContext);

  useDocumentTitle(data.main?.title ? `${data.main.title} | REZ Creative` : document.title);
}

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_WORKS_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorksHero from "./WorksHero/WorksHero";
import WorkDescriptions from "./WorkDescriptions/workDescriptions";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { ScreenShots } from "./ScreenShots/ScreenShots";
import RelatedWorks from "./RelatedWorks/RelatedWorks";

import './WorkDetails.scss';

export default function WorkDetails() {
  const [urlDetails, setUrlDetails] = useState();
  const location = useLocation();
  const { pathname } = location;

  const pathVacancy = pathname.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    setUrlDetails(URL_WORKS_DETAILS + pathVacancy[2]);
  }, []);

  return (
    <DataProvider url={urlDetails}>
      <PageLayout>
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

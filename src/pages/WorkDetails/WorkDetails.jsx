import { PageLayout } from "@/components/PageLayout/PageLayout";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_WORKS_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorksHero from "./WorksHero/WorksHero";
import WorkDescriptions from "./WorkDescriptions/WorkDescriptions";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { FullScreenShot, ProjectsVideo, ScreenShots, ScreenShotsText } from "./ScreenShots/ScreenShots";
import RelatedWorks from "./RelatedWorks/RelatedWorks";

import "./WorkDetails.scss";
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
        <Root />
      </PageLayout>
    </DataProvider>
  );
}

const Root = () => {
  const { data, isLoading } = useContext(DataContext);

  const renderComponent = (section, index) => {
    switch (section.type) {
      case 'hero':
        return (
          <>
            <WorksHero data={section.data} key={`work-details-secton-${section.type}-${index}`}/>
            <Title title={section.data.title} />
          </>
        );
      case 'text_left':
        return <WorkDescriptions data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'slider_with_mini_pictures':
        return <ImageSlider data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'screenshots_one_by_one':
        return <ScreenShots data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'screenshots_one_by_one-and-text':
        return <ScreenShotsText data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'full_screen_image':
        return <FullScreenShot image={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'videos':
        return <ProjectsVideo data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      case 'related_projects':
        return <RelatedWorks data={section.data} key={`work-details-secton-${section.type}-${index}`}/>;
      default:
        return null;
    }
  };

  return (
    <main className="work-details">
      {data.page.map((section, i) => renderComponent(section, i))}
    </main>
  );
};

const Title = ({ title }) => {

  useDocumentTitle(
    title ? `${title} | REZ Creative` : document.title
  );
};

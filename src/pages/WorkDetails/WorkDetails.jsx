import { PageLayout } from "@/components/PageLayout/PageLayout";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_WORKS_DETAILS } from "@/helpers/dataHelpers/linksAPI";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorksHero from "./WorksHero/WorksHero";
import WorkDescriptions from "./WorkDescriptions/WorkDescriptions";
import { BigImageSlider, MiniImageSlider, WindowSlider } from "./ImageSlider/ImageSlider";
import {
  FullScreenShot,
  ProjectsVideo,
  ScreenShots,
  ScreenShotsText,
  SmallProjectsVideo,
} from "./ScreenShots/ScreenShots";
import RelatedWorks from "./RelatedWorks/RelatedWorks";

import "./WorkDetails.scss";
import { useDocumentTitle } from "@/helpers/useDocumentTitle";
import { ContentAndText } from "./ContentAndText/ContentAndText";
import { TextSection } from "./TextSections/TextSections";

export default function WorkDetails() {
  const [urlDetails, setUrlDetails] = useState();
  const location = useLocation();
  const { pathname } = location;

  const pathWorks = pathname.split("/");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathWorks[2] !== "attack-on-titan") {
      setUrlDetails("/worksDetails.json");
    } else {
      setUrlDetails("/onlyNewBlocks.json");
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setUrlDetails(URL_WORKS_DETAILS + pathWorks[2]);
  // }, []);

  return (
    <DataProvider url={urlDetails}>
    {/* <DataProvider url={"/worksDetails.json"}>
    <DataProvider url={"/onlyNewBlocks.json"}> */}
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
      case "left_text": 
        return (
          <TextSection
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "center_text": 
        return (
          <TextSection
            data={section.data}
            position="center"
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "text_left":
        return (
          <WorkDescriptions
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "slider_with_mini_pictures":
        return (
          <MiniImageSlider
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "slider_with_fullscreen_pictures":
        return (
          <BigImageSlider
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "slider_window":
        return (
          <WindowSlider
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "screenshots_one_by_one":
        return (
          <ScreenShots
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "screenshots_one_by_one-and-text":
        return (
          <ScreenShotsText
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "full_screen_image":
        return (
          <FullScreenShot
            image={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "video":
        return (
          <ProjectsVideo
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "small_video":
        return (
          <SmallProjectsVideo
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "content_and_text_right":
        return (
          <ContentAndText
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "content_and_text_left":
        return (
          <ContentAndText
            data={section.data}
            side="left"
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      case "related_projects":
        return (
          <RelatedWorks
            data={section.data}
            key={`work-details-section-${section.type}-${index}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="work-details">
      <WorksHero />
      <div style={{ height: "2vh" }}></div>
      {data.page.map((section, i) => renderComponent(section, i))}
    </main>
  );
};

const Title = () => {
  const { data } = useContext(DataContext);

  useDocumentTitle(data.documentTitle ? data.documentTitle : "rez");
};

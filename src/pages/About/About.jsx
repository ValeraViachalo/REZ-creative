import { PageLayout } from "@/components/PageLayout/PageLayout";
import React, { useEffect } from "react";
import Reel from "./Reel/Reel";
import "./About.scss";
import { Footer } from "@/components/Footer/Footer";
import AboutSection from "./AboutSection/AboutSection";
import Services from "./Services/Services";
import Team from "./Team/Team";
import CTA from "./CTA/CTA";
import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_ABOUT } from "@/helpers/dataHelpers/linksAPI";
import { useDocumentTitle } from "@/helpers/useDocumentTitle";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentTitle('About us | REZ Creative');

  return (
    <DataProvider url={URL_ABOUT}>
      <PageLayout>
        <main className="about-page">
          <Reel />
          <AboutSection />
          <Services />
          <Team />
          <CTA />
        </main>
      </PageLayout>
    </DataProvider>
  );
}

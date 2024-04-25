import React, { useEffect } from "react";

import { Hero } from "./Hero/Hero";
import About from "./About/About";
import WorksTop from "./WorksTop/WorksTop";
import Works from "./Works/Works";
import Partners from "./Partners/Partners";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Footer } from "@/components/Footer/Footer";
import { DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_HOME_DATA } from "@/helpers/dataHelpers/linksAPI";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DataProvider url={URL_HOME_DATA}>
      <PageLayout>
        <main className="home">
          <DataProvider url={"/heroWokrs.json"}>
            <Hero />
          </DataProvider>
          <About />
          <WorksTop />
          <Works />
          <Partners />
        </main>
      </PageLayout>
    </DataProvider>
  );
}

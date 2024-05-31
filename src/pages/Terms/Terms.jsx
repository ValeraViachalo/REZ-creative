import { DataContext, DataProvider } from "@/helpers/dataHelpers/dataProvider";
import { URL_TERMS } from "@/helpers/dataHelpers/linksAPI";
import React, { useContext, useEffect } from "react";

import "@/styles/dynamickHtml.scss";
import { Footer } from "@/components/Footer/Footer";
import { PageLayout } from "@/components/PageLayout/PageLayout";
import { useDocumentTitle } from "@/helpers/useDocumentTitle";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DataProvider url={URL_TERMS}>
      <PageLayout>
        <main className="dynamickPage container">
          <BodyTerms />
        </main>
      </PageLayout>
    </DataProvider>
  );
}

const BodyTerms = () => {
  const { data, isLoading } = useContext(DataContext);

  useDocumentTitle(data?.hero?.title && `${data?.hero?.title} | REZ Creative`);

  return (
    <section>
      {!isLoading && (
        <>
          <h1 className="dynamickPage__title">{data.hero.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.hero.text }} />
        </>
      )}
    </section>
  );
};

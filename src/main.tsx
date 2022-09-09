import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Routes, defer, DataBrowserRouter } from "react-router-dom";
import * as React from "react";

export function main({
  // I don't really like this aspect... The passing of things but
  // i guess it makes sense?
  folderResource,
  indexResource
}) {
  const rootElement = document.getElementById("root");
  const root = ReactDOMClient.createRoot(rootElement);

  const Folder = () => {
    const PageImpl = folderResource.read();
    return <PageImpl />;
  };

  const FolderRoute = () => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Folder />
      </React.Suspense>
    );
  };

  const Index = () => {
    const PageImpl = indexResource.read();
    return <PageImpl />;
  };
  const IndexRoute = () => {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Index />
      </React.Suspense>
    );
  };

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexRoute />} />
          <Route path="/folder" element={<FolderRoute />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

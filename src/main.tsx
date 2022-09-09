import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Routes, defer, DataBrowserRouter, useRoutes } from "react-router-dom";
import * as React from "react";
import { RouteInfo } from ".";

export function main({
  // I don't really like this aspect... The passing of things but
  // i guess it makes sense?
  routes
}: {
  routes: RouteInfo[],
}) {
  // TODO(sam.c): I wonder if we could improve the hot-reloading experience with this... I doubt
  // it.. and I am probably coupling too many things together..
  const rootElement = document.getElementById("root");
  const root = ReactDOMClient.createRoot(rootElement);


  function App() {
    const element = useRoutes(routes);

    return element;
  }


  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

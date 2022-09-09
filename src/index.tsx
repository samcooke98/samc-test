import { Resource } from "./base/resource";
import { preloadFolder, preloadFolderRoute } from "./features/folders/preload";
import { preloadIndexRoute } from "./features/index/preload";
import { matchRoutes } from "react-router-dom";
import React from "react";

export type RouteInfo = Parameters<typeof matchRoutes>[0][number] & {
  preload: () => void;
};

function preload(bootstrap) {
  // start fetching main
  const main = import("./main").then((res) => res.main);

  // Home has (IMO) three broad categories of features.

  // There is a class of Features that provide capabilities (eg; Uploading);
  // I consider `installServices` an example of this.

  // Home has "subpages". These are displayed at a route.
  // Note; this example allows sub-pages to define their routes. I'm not sure that makes sense
  // as routes could conflict.
  const folderRoutes = preloadFolderRoute();
  const indexRoute = preloadIndexRoute();
  const contentPlannerRoute = preloadContentPlannerRoute();

  // Features that contribute \ customize \ tailor existing features.
  // EG: Adding a upselling dialog to a custom page.

  // Maybe you could make an argument for 'always-present' features like `sidebar`, and `header`.

  // TODO: Demo of a feature that takes priority over others? EG: Onboarding modal?

  const match = matchRoutes<RouteInfo>(
    [folderRoutes, indexRoute],
    window.location
  );

  if (match) {
    match[0].route.preload();
  }

  if (window.location.pathname.includes("folder")) {
    console.log("preloading folders...");
    folderResource.preload();
  }
  if (window.location.pathname === "/") {
    console.log("preloading index...");
    indexResource.preload();
  }

  main.then((main) => main({ folderResource, indexResource }));
}

preload();

import { Resource } from "./base/resource";
import { preloadFolder, preloadFolderRoute } from "./features/folders/preload";
import { preloadIndexRoute } from "./features/index/preload";
import { matchRoutes } from "react-router-dom";
import React from "react";
import { preloadContentPlannerRoute } from "./features/content_planner/preload";
import { preloadServices } from "./features/services/preload";

export type RouteInfo = Parameters<typeof matchRoutes>[0][number] & {
  preload: () => void;
  children: RouteInfo;
};

function preload() {
  // start fetching main
  const main = import("./main").then((res) => res.main);

  // Home has (IMO) three broad categories of features.

  // There is a class of Features that provide capabilities (eg; Uploading);
  // I consider `installServices` an example of this.

  // NB: Name is terrible, see linked file..
  const { folderService,  } = preloadServices();

  // Home has "subpages". These are displayed at a route.
  // Note; this example allows sub-pages to define their routes. I'm not sure that makes sense
  // as routes could conflict.
  const folderRoutes = preloadFolderRoute({
    folderService,
  });
  const indexRoute = preloadIndexRoute();
  const contentPlannerRoute = preloadContentPlannerRoute();

  // Features that contribute \ customize \ tailor existing features.
  // EG: Adding a upselling dialog to a custom page.

  // Maybe you could make an argument for 'always-present' features like `sidebar`, and `header` as a different category\class of features..

  // TODO: Demo of a feature that takes priority over others? EG: Onboarding modal? Promo dialogs.

  const routes = [folderRoutes, indexRoute, contentPlannerRoute];

  // Determine what page is being loaded, then kick-off loading that.
  const match = matchRoutes<RouteInfo>(
    [folderRoutes, indexRoute, contentPlannerRoute],
    window.location
  );

  if (match) {
    // NB: Purposefully not using await here. We'll use Suspense as the mechanism for placeholder
    // states.
    match.forEach(match => match.route.preload());
  }


  main.then((main) => main({ routes }));
}

preload();


/*
Features can be broken into a few classes;

* Conditional.
- A feature can be considered conditional, if during the initalisation (executing the bootloader),
  the feature is decided to be loaded or not. For the lifecycle of the application, this decision can
  not be revisted.
  Example; Responsive vs Fixed editing. An onboarding dialog.


* Conditional & Lazy
- A feature is lazy & conditional, if it can be loaded either during the initialisation process, or in response to a user interaction.
For example; a subpage in the homepage is conditional. During the initialisation, the bootloader may determine
it needs to load a page immediately

* Lazy
- A feature is lazy if it is only ever displayed in response to a user-interaction. For example, a brand switcher dropdown.

*/
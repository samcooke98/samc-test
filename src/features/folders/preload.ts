// In reality, I think this would return some kind of route information

import { Resource } from "../../base/resource";
import * as React from "react";
import { RouteInfo } from "../..";

export function preloadFolder(): Resource<React.ComponentType> {
  const resource = new Resource(() =>
    import(/* webpackChunkName: "foo" */ "./create").then((res) => {
      return res.create();
    })
  );

  return resource;
}

export function preloadFolderRoute(): RouteInfo {
  return {
    path: "/folder",
    preload: () => {},
    children: [
      {
        path: "/folder/:id"
      }
    ]
  };
}

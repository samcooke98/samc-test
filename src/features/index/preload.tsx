import { RouteInfo } from "../..";
import { Resource } from "../../base/resource";

export function preloadIndexRoute(): RouteInfo {
  return new Resource(() => import("./create").then((res) => res.create()));
}

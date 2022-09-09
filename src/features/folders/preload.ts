// In reality, I think this would return some kind of route information

import { Resource } from "../../base/resource";
import type { RouteInfo } from "../..";
import type { FolderService } from "../services/folder_service";

export function preloadFolder(): Resource<React.ComponentType> {
  const resource = new Resource(() =>
    import(/* webpackChunkName: "foo" */ "./create").then((res) => {
      return res.create();
    })
  );

  return resource;
}

export function preloadFolderRoute({
  folderService,
}: {
  folderService: Resource<FolderService>,
}): RouteInfo {

  const AllFoldersData = new Resource(
    async () => (await folderService.load()).findFolders()
  );

  // const resource = AllFoldersData.read();



  const AllFoldersPageComponent = new Resource(
    () => import('./all_folders').then(m => m.AllFoldersPage)
  );

  // const AllFoldersPage = combineResources([AllFoldersPageComponent, folderService], ([page, service]) => {

  // });


  return {
    path: "/folder",
    preload: () => {
      // When a user navigates to the folders page, we want to start loading the code for it...
      AllFoldersPageComponent.preload();

      // But we also want to start loading the data for it, which requires the folderService
      AllFoldersData.load();

    },
    children: [
      {
        path: "/folder/:id",
      }
    ]
  };
}





// type ParametersToResources<T extends (...args: any) => any> = T extends (args: infer P) => any ? Resource<P> : never


// function combineResources<U extends Array<Resource<any>>, T>(resources: [...U], factory: (args: U) => T): Resource<T> {
//   const results = resources.map(r => r.load())
// }
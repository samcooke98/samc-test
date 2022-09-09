


// Preload is a terrible name... It should be `servicesBootloader` or something.
// We're not actually _preloading_ any services. Just setting them up for other features
// (or the boot loader itself, maybe) to pull the services in.

import { Resource } from "../../base/resource";

// For example, if a specific route
export function preloadServices() {

  const folderServiceResource = new Resource(() =>
    import('./folder_service').then(mod => new mod.FolderService())
  );

  return {
    folderService: folderServiceResource,
    uploadService: { } as unknown,
    doctypeService: { } as unknown,
    contentPlannerService: { } as unknown,
  }

}
export function bootloader(): UploadingFeatures | undefined {
  return {
    uploadFile: () => {
      console.log("User has initiated an upload action");
    }
  };
}

type UploadingFeatures = {
  uploadFile: () => Promise<Upload>;
};

type Upload = {};
// We concrete r



export class FolderService {

  private delay() {
    return new Promise<void>(res => setTimeout(() => res(), 100));
  }


  async findFolders(): Promise<Folder[]> {
    await this.delay();

    return Array.from({length: 10}).map((_,i) => aFolderWith({
      title: "Hello World " + i,
    }));
  }

  async getFolder(): Promise<Folder> {
    await this.delay();
    return aFolderWith({});
  }
}

interface Folder {
  id: string,
  itemCount: number,
  title: string,
  thumbnail: {
    url: string;
  }
}


function aFolderWith(opts: Partial<Folder>): Folder {
  return {
    id: "F1",
    itemCount: 0,
    title: "Hello World",
    thumbnail: {
      url: '//via.placeholder.com/150x150',
    },
    ...opts
  };
}
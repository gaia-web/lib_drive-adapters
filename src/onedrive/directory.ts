import { Directory, FileOrDirectory } from "../utils/interfaces";
import { OneDriveFile } from "./file";
import { OneDriveFileOrDirectory } from "./file-or-directory";

type DriveItem = {
  name: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  "@content.downloadUrl"?: string;
};

type ChildrenAPIResult = {
  value: DriveItem[];
};

export class OneDriveDirectory
  extends OneDriveFileOrDirectory
  implements Directory
{
  get children() {
    if (!this.#obtainChildrenAPIUrl) {
      return;
    }
    return this.#obtainChildren();
  }

  async goToPath(subpath: string) {
    if (!this.apiEndpoint || !this.path) {
      return undefined;
    }
    const apiUrl = `${this.apiEndpoint}/root:${this.#mergePath(
      this.path,
      subpath
    )}`;
    const driveItem = await fetch(apiUrl).then(
      (response) => response.json() as Promise<DriveItem>
    );
    return this.#generateFileOrDirectoryObject(
      this.#mergePath(this.path, subpath),
      driveItem
    );
  }

  async *#obtainChildren(subpath = "") {
    const childrenAPIUrl = this.#obtainChildrenAPIUrl(subpath);
    if (!childrenAPIUrl) {
      return undefined;
    }
    const children = await fetch(childrenAPIUrl).then(
      (response) => response.json() as Promise<ChildrenAPIResult>
    );
    for (let driveItem of children.value) {
      const fileOrDirectory = this.#generateFileOrDirectoryObject(
        this.#mergePath(this.path, subpath),
        driveItem
      );
      if (fileOrDirectory) {
        yield fileOrDirectory;
      }
    }
  }

  #obtainChildrenAPIUrl(subpath = "") {
    if (!this.apiEndpoint || !this.path) {
      return;
    }
    return `${this.apiEndpoint}/root:${this.#mergePath(
      this.path,
      subpath
    )}:/children`;
  }

  #generateFileOrDirectoryObject(path: string, driveItem: DriveItem) {
    if (!path || !driveItem) {
      return;
    }
    const args = {
      apiEndpoint: this.apiEndpoint,
      name: driveItem.name,
      path,
      createdTime: new Date(driveItem.createdDateTime),
      lastModifiedTime: new Date(driveItem.lastModifiedDateTime),
    };
    const contentDownloadUrl = driveItem["@content.downloadUrl"];
    if (contentDownloadUrl) {
      return new OneDriveFile({
        ...args,
        contentDownloadUrl,
      }) as FileOrDirectory;
    } else {
      return new OneDriveDirectory(args) as FileOrDirectory;
    }
  }

  #mergePath(path?: string, subpath?: string) {
    return `${path === "/" ? "" : path ?? ""}${subpath ? `/${subpath}` : ""}`;
  }
}

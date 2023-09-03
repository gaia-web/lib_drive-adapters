import { FileOrDirectory } from "../utils/interfaces";

export interface OneDriveFileOrDirectoryArgs {
  apiEndpoint?: string;
  name?: string;
  path?: string;
  createdTime?: Date;
  lastModifiedTime?: Date;
}

export class OneDriveFileOrDirectory implements FileOrDirectory {
  protected apiEndpoint?: string;

  #name?: string;
  get name() {
    return this.#name;
  }

  #path?: string;
  get path() {
    return this.#path;
  }

  #createdTime?: Date;
  get createdTime() {
    return this.#createdTime;
  }

  #lastModifiedTime?: Date;
  get lastModifiedTime() {
    return this.#lastModifiedTime;
  }

  constructor({
    apiEndpoint,
    name,
    path,
    createdTime,
    lastModifiedTime,
  }: OneDriveFileOrDirectoryArgs) {
    this.apiEndpoint = apiEndpoint;
    this.#name = name;
    this.#path = path;
    this.#createdTime = createdTime;
    this.#lastModifiedTime = lastModifiedTime;
  }
}

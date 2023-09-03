import { File } from "../utils/interfaces";
import {
  OneDriveFileOrDirectory,
  OneDriveFileOrDirectoryArgs,
} from "./file-or-directory";

interface OneDriveFileArgs extends OneDriveFileOrDirectoryArgs {
  contentDownloadUrl?: string;
}

export class OneDriveFile<T = unknown>
  extends OneDriveFileOrDirectory
  implements File
{
  #contentDownloadUrl?: string;
  get contentDownloadUrl() {
    return this.#contentDownloadUrl;
  }

  get contentAsText() {
    return this.#obtainContentResponse().then((response) => response?.text());
  }
  get contentAsJson() {
    return this.#obtainContentResponse().then(
      (response) => response?.json() as T | undefined
    );
  }
  get contentAsBlob() {
    return this.#obtainContentResponse().then((response) => response?.blob());
  }
  get contentAsArrayBuffer() {
    return this.#obtainContentResponse().then((response) =>
      response?.arrayBuffer()
    );
  }

  constructor(args: OneDriveFileArgs) {
    super(args);
    this.#contentDownloadUrl = args.contentDownloadUrl;
  }

  async #obtainContentResponse() {
    if (!this.#contentDownloadUrl) {
      return;
    }
    return await fetch(this.#contentDownloadUrl);
  }
}

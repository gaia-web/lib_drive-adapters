import { DriveAdapter } from "../utils/interfaces";
import { OneDriveDirectory } from "./directory";

const ONEDRIVE_API_ENDPOINT_PREFIX = "https://api.onedrive.com/v1.0/shares/u!";

export class OneDriveAdapter extends OneDriveDirectory implements DriveAdapter {
  #sharingLink: string;

  constructor(sharingLink: string) {
    super({ path: "/" });
    this.#sharingLink = sharingLink;
    this.apiEndpoint = this.#generateAPIEndpoint();
  }

  #generateAPIEndpoint() {
    if (!this.#sharingLink) {
      return;
    }
    const sharingToken = btoa(this.#sharingLink)
      .replaceAll("/", "_")
      .replaceAll("+", "-");
    const endpoint = `${ONEDRIVE_API_ENDPOINT_PREFIX}${sharingToken}`;
    return endpoint;
  }
}

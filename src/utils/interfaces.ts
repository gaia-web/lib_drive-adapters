export interface FileOrDirectory {
  get name(): string | undefined;
  get path(): string | undefined;
  get createdTime(): Date | undefined;
  get lastModifiedTime(): Date | undefined;
}

export interface Directory extends FileOrDirectory {
  get children(): AsyncIterable<FileOrDirectory> | undefined;

  goToPath(subpath: string): Promise<FileOrDirectory | undefined>;
}

export interface File<T = unknown> extends FileOrDirectory {
  get contentDownloadUrl(): string | undefined;
  get contentAsText(): Promise<string | undefined>;
  get contentAsJson(): Promise<T | undefined>;
  get contentAsBlob(): Promise<Blob | undefined>;
  get contentAsArrayBuffer(): Promise<ArrayBuffer | undefined>;
}

export interface DriveAdapter extends Directory {}

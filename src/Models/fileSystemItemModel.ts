import { FolderModel } from "./folderModel";

export abstract class FileSystemItemModel {
	public caption: string;

	constructor(public fullName: string, public parentFolder: FolderModel | null) {
		this.caption = fullName.substring(fullName.lastIndexOf('/') + 1);
	}
}
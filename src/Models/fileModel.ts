import { FileSystemItemModel } from "./fileSystemItemModel";
import { FolderModel } from "./folderModel";

export class FileModel extends FileSystemItemModel {
	constructor(fullName: string, parentFolder: FolderModel | null) {
		super(fullName, parentFolder);
	}
}
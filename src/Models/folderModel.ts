import { FileSystemItemModel } from "./fileSystemItemModel";

export class FolderModel extends FileSystemItemModel {
	public fileSystemItems: FileSystemItemModel[];

	constructor(fullName: string, parentFolder: FolderModel | null) {
		super(fullName, parentFolder);

		this.fileSystemItems = [];
	}
}
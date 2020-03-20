import { FileSystemItemModel } from "./models/fileSystemItemModel";
import { FolderModel } from "./models/folderModel";
import { FileModel } from "./models/fileModel";

const fileNameList: string[] = ["New/Test/Readme.md", "New/Test/config/project-scratch-def.json"];

let items = fillHierarhy(fileNameList);

function fillHierarhy(fileNameList: string[]): FileSystemItemModel[] | null {
	const rootFileSystemItems: FileSystemItemModel[] = [];

	fileNameList.forEach(fileName => {
		const itemNames: string[] = fileName.split('/');
		let currentFolder: FolderModel | null = null
		let isRootItem: boolean = true;

		itemNames.forEach(itemName => {
			if (isRootItem) {
				currentFolder = rootFileSystemItems.find(i => i.caption === itemName) as FolderModel;

				if (!currentFolder) {
					if (isFile(itemName)) {
						const file: FileModel = new FileModel(itemName, null);
						rootFileSystemItems.push(file);
					} else {
						currentFolder = new FolderModel(itemName, null);
						rootFileSystemItems.push(currentFolder);
					}
				}
			} else if (currentFolder) {
				currentFolder = getAndAddNewItemToFolder(currentFolder, itemName);
			}

			isRootItem = false;
		});
	});

	return rootFileSystemItems;
}


function getAndAddNewItemToFolder(parentFolder: FolderModel, itemName: string): FolderModel | null {
	const fullName: string = parentFolder.fullName + '/' + itemName;

	if (isFile(itemName)) {
		const file: FileModel = new FileModel(fullName, parentFolder);
		parentFolder.fileSystemItems.push(file);

		return null;
	}

	let folder: FolderModel | undefined = parentFolder.fileSystemItems.find(i => i.caption === itemName) as FolderModel;

	if (folder) {
		return folder;
	}

	folder = new FolderModel(fullName, parentFolder);
	parentFolder.fileSystemItems.push(folder);

	return folder;
}

// TODO: if folder name with dot
function isFile(fileSystemItemName: string): boolean {
	return fileSystemItemName.split('.').pop() != fileSystemItemName;
}
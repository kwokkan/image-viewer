import { FileNodeType } from "./FileNodeType";

export interface IFileNode {
	name: string;
	path: string;
	type: FileNodeType;
	children?: IFileNode[];
}

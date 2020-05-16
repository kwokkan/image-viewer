import { IFile } from "./IFile";
import { IFileNode } from "./IFileNode";

export interface IDirectory extends IFileNode {
    files: IFile[];
}

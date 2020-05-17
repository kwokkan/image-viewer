import * as fs from "fs";
import * as rpath from "path";
import { FileNodeType } from "../types/FileNodeType";
import { IFileNode } from "../types/IFileNode";

export async function getFileNodes(basePath: string, path: string, recurse: boolean): Promise<IFileNode[]> {
    const files: IFileNode[] = [];

    if (fs.existsSync(path)) {
        const dir = fs.opendirSync(path);

        if (dir) {
            let currentDirent = null;

            while (true) {
                currentDirent = await dir.read();

                if (!currentDirent) {
                    break;
                }

                const currentPath = rpath.resolve(path, currentDirent.name);
                let currentFileNode: IFileNode = {
                    name: currentDirent.name,
                    path: rpath.relative(basePath, currentPath),
                    type: currentDirent.isDirectory() ? FileNodeType.Directory : FileNodeType.File
                };
                files.push(currentFileNode);

                if (recurse && currentFileNode.type == FileNodeType.Directory) {
                    const children = await getFileNodes(basePath, currentPath, recurse);

                    if (children.length) {
                        currentFileNode.children = children;
                    }
                }
            }

            await dir.close();
        }
    }

    return files;
}

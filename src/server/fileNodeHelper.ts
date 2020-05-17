import { FileNodeType } from "../types/FileNodeType";
import { IFileNode } from "../types/IFileNode";

import fs = require("fs");
import rpath = require("path");

export async function getFileNodes(path: string, recurse: boolean): Promise<IFileNode[]> {
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

                let currentFileNode: IFileNode = {
                    name: currentDirent.name,
                    path: currentDirent.name,
                    type: currentDirent.isDirectory() ? FileNodeType.Directory : FileNodeType.File
                };
                files.push(currentFileNode);

                if (recurse && currentFileNode.type == FileNodeType.Directory) {
                    const childPath = rpath.resolve(path, currentDirent.name);
                    const children = await getFileNodes(childPath, recurse);

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

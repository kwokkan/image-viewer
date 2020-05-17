import React from "react";
import { IFileNode } from "../types/IFileNode";

interface IFileItemProps {
    fileNode: IFileNode;
    apiPrefix?: string;
}

export function FileItem(props: IFileItemProps): JSX.Element {
    const src = `${props.apiPrefix}view/${props.fileNode.path}`;
    return (
        <img className="max-width" src={src} alt={props.fileNode.name} />
    );
}

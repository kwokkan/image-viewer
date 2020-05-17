import React, { useEffect, useState } from "react";
import { Container, Content, DataItemType } from "rsuite";
import { FileNodeType } from "../types/FileNodeType";
import { IFileNode } from "../types/IFileNode";
import { FileItem } from "./FileItem";
import { NavigationMenu } from "./NagivationMenu";

function parseTreeJson(files: IFileNode[]): DataItemType[] {
    const tree: DataItemType[] =

        files.map(x => ({
            label: x.name,
            value: x,
            children: x.children ? parseTreeJson(x!.children) : null
        }));

    return tree;
}

interface IAppProps {
    apiPrefix?: string;
}

export function App(props: IAppProps): JSX.Element {
    const [files, setFiles] = useState<DataItemType[]>([]);
    const [displayItems, setDisplayItems] = useState<IFileNode[]>([]);

    useEffect(() => {
        async function init() {
            const response = await fetch(`${props.apiPrefix}browse/`);
            const json = await response.json() as IFileNode[];

            const treeData = parseTreeJson(json);
            setFiles(treeData);
        }

        init();
    }, []);

    const onFileNodeSelected = (fileNode: IFileNode) => {
        console.debug(fileNode);

        setDisplayItems([]);
        document.title = fileNode.path + " - Image Viewer";
        window.scrollTo(0, 0);

        if (fileNode.type == FileNodeType.Directory) {
            if (fileNode.children) {
                setDisplayItems(fileNode.children);
            }
        }
        else {
            setDisplayItems([fileNode]);
        }
    };

    return (
        <div className="show-container">
            <Container>
                <NavigationMenu items={files} onFileNodeSelected={onFileNodeSelected} />
                <Container>
                    <Content>
                        {displayItems.length == 0 ?
                            <div>Nothing to display</div>
                            :
                            displayItems.map(x =>
                                <FileItem key={x.name} apiPrefix={props.apiPrefix} fileNode={x} />
                            )
                        }
                    </Content>
                </Container>
            </Container>
        </div>
    );
}

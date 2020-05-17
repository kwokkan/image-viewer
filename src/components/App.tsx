import React, { useEffect, useState } from "react";
import { Container, Content, DataItemType } from "rsuite";
import { FileNodeType } from "../types/FileNodeType";
import { IFileNode } from "../types/IFileNode";
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
    const [displayUrls, setDisplayUrls] = useState<string[]>([]);

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

        if (fileNode.type == FileNodeType.Directory) {
            if (fileNode.children) {
                setDisplayUrls(fileNode.children.map(x => x.path));
            }
            else {
                setDisplayUrls([]);
            }
        }
        else {
            setDisplayUrls([fileNode.path]);
        }
    };

    return (
        <div className="show-container">
            <Container>
                <NavigationMenu items={files} onFileNodeSelected={onFileNodeSelected} />
                <Container>
                    <Content>
                        {displayUrls.length == 0 ?
                            <div>Nothing to display</div>
                            :
                            displayUrls.map(x =>
                                <img className="max-width" src={`${props.apiPrefix}view/${x}`} alt={x} />
                            )
                        }
                    </Content>
                </Container>
            </Container>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Container, Content, DataItemType, Header } from "rsuite";
import { IFileNode } from "../types/IFileNode";
import { NavigationMenu } from "./NagivationMenu";

export function App(): JSX.Element {
    const [files, setFiles] = useState<DataItemType[]>([]);

    useEffect(() => {
        async function init() {
            const response = await fetch("/api/files");
            const json = await response.json() as IFileNode[];
            console.debug(json);

            const treeData = json.map(x => ({ label: x.name, value: x.name }));
            setFiles(treeData);
        }

        init();
    }, []);

    return (
        <div className="show-container">
            <Container>
                <NavigationMenu items={files} />
                <Container>
                    <Header>Header</Header>
                    <Content>Content</Content>
                </Container>
            </Container>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Container, Content, DataItemType, Header, Icon, Nav, Sidebar, Sidenav, Tree } from "rsuite";
import { IFileNode } from "../types/IFileNode";

export function App(): JSX.Element {
    const [expanded, setExpanded] = useState(true);
    const [files, setFiles] = useState<DataItemType[]>([]);

    const sideBarClick = () => {
        setExpanded(!expanded);
    };

    const sidebarTreeOnSelect = () => {
    };

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
                <Sidebar collapsible width={expanded ? 260 : 56}>
                    <Sidenav expanded={expanded} appearance="subtle">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" onClick={sideBarClick} active icon={<Icon icon={expanded ? "close" : "bars"} />}>
                                    Viewer
                                </Nav.Item>

                                <Nav.Item eventKey="2" icon={<Icon icon="folder" />}>
                                    <Tree data={files} defaultExpandAll onSelect={sidebarTreeOnSelect} />
                                </Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                </Sidebar>
                <Container>
                    <Header>Header</Header>
                    <Content>Content</Content>
                </Container>
            </Container>
        </div>
    );
}

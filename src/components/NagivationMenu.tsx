import React, { useState } from "react";
import { DataItemType, Dropdown, Icon, Nav, Sidebar, Sidenav, Tree } from "rsuite";
import { IFileNode } from "../types/IFileNode";

export interface INavigationMenuProps {
    items: DataItemType[];
    onFileNodeSelected?: (fileNode: IFileNode) => void;
}

export function NavigationMenu(props: INavigationMenuProps): JSX.Element {
    const [expanded, setExpanded] = useState(true);

    const sideBarClick = () => {
        setExpanded(!expanded);
    };

    const sidebarTreeOnSelect = (_activeNode: DataItemType, value: IFileNode, _event: any) => {
        if (props.onFileNodeSelected) {
            props.onFileNodeSelected(value);
        }
    };

    return (
        <Sidebar collapsible width={expanded ? '40%' : 56}>
            <Sidenav expanded={expanded} appearance="subtle">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" onClick={sideBarClick} active icon={<Icon icon={expanded ? "close" : "bars"} />}>
                            Viewer
                        </Nav.Item>

                        <Dropdown eventKey="2" title="Files" placement="rightStart" icon={<Icon icon="folder" />}>
                            <Dropdown.Item divider />
                            <Dropdown.Item >
                                <Tree data={props.items} defaultExpandAll onSelect={sidebarTreeOnSelect} />
                            </Dropdown.Item>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
}

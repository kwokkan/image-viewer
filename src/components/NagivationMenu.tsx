import React, { useState } from "react";
import { DataItemType, Icon, Nav, Sidebar, Sidenav, Tree } from "rsuite";

export interface INavigationMenuProps {
    items: DataItemType[];
}

export function NavigationMenu(props: INavigationMenuProps): JSX.Element {
    const [expanded, setExpanded] = useState(true);

    const sideBarClick = () => {
        setExpanded(!expanded);
    };

    const sidebarTreeOnSelect = () => {
    };

    return (
        <Sidebar collapsible width={expanded ? 260 : 56}>
            <Sidenav expanded={expanded} appearance="subtle">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" onClick={sideBarClick} active icon={<Icon icon={expanded ? "close" : "bars"} />}>
                            Viewer
                                </Nav.Item>

                        <Nav.Item eventKey="2" icon={<Icon icon="folder" />}>
                            <Tree data={props.items} defaultExpandAll onSelect={sidebarTreeOnSelect} />
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
}

import React, { Fragment, useState } from "react";
import { ButtonToolbar, Drawer, Icon, IconButton, Tree } from "rsuite";
import { ItemDataType } from "rsuite/lib/@types/common";
import { IFileNode } from "../types/IFileNode";

export interface INavigationMenuProps {
    items: ItemDataType[];
    onFileNodeSelected?: (fileNode: IFileNode) => void;
}

export function NavigationMenu(props: INavigationMenuProps): JSX.Element {
    const [expanded, setExpanded] = useState(true);

    const sideBarClick = () => {
        setExpanded(!expanded);
    };

    const sidebarTreeOnSelect = (_activeNode: ItemDataType, value: IFileNode, _event: any) => {
        if (props.onFileNodeSelected) {
            props.onFileNodeSelected(value);
        }
    };

    const buttons =
        <ButtonToolbar className="fixed z-top m-2">
            <IconButton circle size="lg" appearance="subtle" icon={<Icon icon={expanded ? "close" : "bars"} />} onClick={sideBarClick} />
        </ButtonToolbar>
        ;

    return (
        <Fragment>
            {buttons}

            <Drawer show={expanded} placement="left" backdrop={true} onHide={sideBarClick}>
                {buttons}

                <div className="m-2">
                </div>

                <Drawer.Body>
                    <Tree data={props.items} defaultExpandAll virtualized onSelect={sidebarTreeOnSelect} />
                </Drawer.Body>
            </Drawer>
        </Fragment>
    );
}

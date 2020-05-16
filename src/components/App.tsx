import React, { useState } from "react";
import { Container, Content, Header, Icon, Nav, Sidebar, Sidenav } from "rsuite";

export function App(): JSX.Element {
    const [expanded, setExpanded] = useState(true);

    const sideBarChanged = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="show-container">
            <Container>
                <Sidebar collapsible>
                    <Sidenav expanded={expanded} appearance="inverse">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" onClick={sideBarChanged} active icon={<Icon icon={expanded ? "close" : "bars"} />}>
                                    Viewer
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

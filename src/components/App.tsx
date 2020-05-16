import React from "react";
import { Container, Content, Header, Sidebar } from "rsuite";

export function App(): JSX.Element {
    return (
        <div className="show-container">
            <Container>
                <Sidebar>Sidebar</Sidebar>
                <Container>
                    <Header>Header</Header>
                    <Content>Content</Content>
                </Container>
            </Container>
        </div>
    );
}

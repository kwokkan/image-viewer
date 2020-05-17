import React from "react";
import { render } from "react-dom";
import { App } from "./components/App";

import "rsuite/dist/styles/rsuite-default.css";

render(
    <App apiPrefix="/api/" />,
    document.getElementById("app")
);

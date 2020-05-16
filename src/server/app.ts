import { IFileNode } from "../types/IFileNode";

import express = require("express");

const app = express();
const port = 12345;

app.use(express.static("dist"));

app.get("/api/files", (req, res) => {
    console.debug(req);

    const files: IFileNode[] = [
        {
            name: "file.jpg"
        }
    ];

    res.send(files);
});

app.listen(port, () => console.info("App is listening on port " + port));

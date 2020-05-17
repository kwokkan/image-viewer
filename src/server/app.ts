import { IFileNode } from "../types/IFileNode";
import { getFileNodes } from "./fileNodeHelper";

import express = require("express");
import path = require("path");
import process = require("process");

const app = express();
const port = 12345;
const basePath = path.resolve(process.cwd(), "src");

app.use(express.static("dist"));

app.get("/api/files(/:path)?", async (req, res) => {
    const currentPath = path.resolve(basePath, req.params.path || "");

    const files: IFileNode[] = await getFileNodes(currentPath, true);

    res.send(files);
});

app.listen(port, () => console.log("App is listening on port " + port));

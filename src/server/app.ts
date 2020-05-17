import * as express from "express";
import * as path from "path";
import * as process from "process";
import { IFileNode } from "../types/IFileNode";
import { getFileNodes } from "./fileNodeHelper";

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

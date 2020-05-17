import * as express from "express";
import * as path from "path";
import * as process from "process";
import * as yargs from "yargs";
import { IFileNode } from "../types/IFileNode";
import { getFileNodes } from "./fileNodeHelper";

const argv = yargs
    .option("basePath", {
        alias: "bp",
        default: path.resolve(process.cwd(), "src"),
        description: "Base path to serve files from",
        string: true,
        type: "string"
    })
    .option("port", {
        alias: "p",
        default: 12345,
        description: "Port number to listen on",
        number: true,
        type: "number"
    })
    .help()
    .alias("help", "h")
    .argv;

const app = express();
const port = argv.port;
const basePath = argv.basePath;

app.use(express.static("dist"));

app.get("/api/browse/*?", async (req, res) => {
    const currentPath = path.resolve(basePath, req.params[0] || "");

    console.debug("Browse", currentPath);
    const files: IFileNode[] = await getFileNodes(basePath, currentPath, true);

    res.send(files);
});

app.get("/api/view/*?", async (req, res) => {
    const currentPath = path.resolve(basePath, req.params[0] || "");

    console.debug("View", currentPath);
    res.sendFile(currentPath);
});

app.listen(port, () => {
    console.log("Starting viewer ...");

    console.table({
        basePath,
        port
    });
});

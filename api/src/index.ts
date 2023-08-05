import express from "express";
import dotenv from "dotenv";
import path from "path";
import config from "./config"
import migrate from "./model/migrate"


dotenv.config({path: path.join(__dirname, "..", ".env")})
const app = express();


app.get("*", (req: express.Request, res: express.Response) => {
    res.send("Request Received");
})


app.listen(config.port, async()=>{
    await migrate();
    console.log(`Listening on port ${config.port}`)
})
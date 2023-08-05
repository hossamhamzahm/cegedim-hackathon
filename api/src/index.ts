import express from "express";
import dotenv from "dotenv";
import path from "path";
import config from "./config"
import migrate from "./model/migrate"
import SystemUserRouter from "./router/SystemUser"


dotenv.config({path: path.join(__dirname, "..", ".env")})
const app = express();
app.use(express.urlencoded({ extended: true }), express.json());



app.use('/api-v1/users', SystemUserRouter);

app.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send({Error: "Invalid request"});
})


app.listen(config.port, async()=>{
    await migrate();
    console.log(`Listening on port ${config.port}`)
})
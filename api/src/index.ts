import express from "express";
import dotenv from "dotenv";
import path from "path";
import config from "./config"
import migrate from "./model/migrate"
import SystemUserRouter from "./router/SystemUser"
import DoctorRouter from "./router/doctor"
import PatientRouter from "./router/patient"
import PharmacyRouter from "./router/pharmacy"
import ExpressError from "./helper/ExpressError"
import cors from "cors";

dotenv.config({path: path.join(__dirname, "..", ".env")})
const app = express();
app.use(
	express.urlencoded({ extended: true }), 
	express.json(), 
	cors({origin: '*'})
);



app.use('/api-v1/users', SystemUserRouter);
app.use('/api-v1/doctors', DoctorRouter);
app.use('/api-v1/patients', PatientRouter);
app.use('/api-v1/pharmacies', PharmacyRouter);

app.get("*", (req: express.Request, res: express.Response) => {
    res.status(404).send({Error: "Invalid request"});
})



app.use((err: ExpressError, req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { status = 500, message = "Internal Server Error" } = err;

	const responseError: {
		[key: string]: any
	} = { message, status }

	res.status(status).send({
		Error: responseError
	});
});

app.listen(config.port, async()=>{
    await migrate();
    console.log(`Listening on port ${config.port}`)
    console.log(`UP`)
})
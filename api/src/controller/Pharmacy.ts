import express from "express";
import Pharmacy from "../model/Pharmacy";
import SystemUser from "../model/SystemUser";
import ExpressError from "../helper/ExpressError";
import Doctor from "../model/Doctor";
import PharmacyRequest from "../model/PharmacyRequest";





const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { page_no = "1", no_per_pages = "20" } = req.query;

	const limit = parseInt(no_per_pages as string);
	const offset = (parseInt(page_no as string) - 1) * limit;

	const pahramcies = await Pharmacy.findAll({
        offset,
        limit,
        include: {
            model: SystemUser,
            required: true,
        },
        order: [['pharmID', 'DESC']],
    });

	res.send(pahramcies);
};




const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const pharmacy = await Pharmacy.findOne({where: {username}});
	
    if(!pharmacy) throw new ExpressError(`No pharmacy with username ${username}`, 400);
    res.send(pharmacy);
};

// :username/doctor_request/:doctor_username
const request_doctor = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username, doctor_username } = req.params;
    const { patient_username = null } = req.query;

	const pharmacy = await Pharmacy.findOne({where: {username}});
	const doctor = await Doctor.findOne({where: {username: doctor_username}});
	
    if(!pharmacy) throw new ExpressError(`No pharmacy with username ${username}`, 400);
    if(!doctor) throw new ExpressError(`No doctor with username ${doctor_username}`, 400);
    

    const request = PharmacyRequest.create({
        pharm_username: username,
        doctor_username,
        status: false,
        // patient_username,
        pharmacyName: pharmacy.getDataValue("name"),
        // diagnosis: pharmacy.getDataValue("diagnosis"),
    })

    res.send(request);
};



// :username/doctor_request/
const show_requests = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const requests = await PharmacyRequest.findAll({where: {pharm_username: username}});
	
    res.send(requests);
};



export default {
	index,
	show,
    request_doctor,
    show_requests,
};
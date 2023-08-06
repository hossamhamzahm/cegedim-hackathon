import express from "express";
import PharmacyRequest from "../model/PharmacyRequest";
import Doctor from "../model/Doctor";
import SystemUser from "../model/SystemUser";
import ExpressError from "../helper/ExpressError";





const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { page_no = "1", no_per_pages = "20" } = req.query;

	const limit = parseInt(no_per_pages as string);
	const offset = (parseInt(page_no as string) - 1) * limit;

	const doctors = await Doctor.findAll({
        offset,
        limit,
        include: {
            model: SystemUser,
            required: true,
        },
        order: [['did', 'DESC']],
    });

	res.send(doctors);
};




const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const doctor = await Doctor.findOne({where: {username}});
	
    if(!doctor) throw new ExpressError(`No Doctor with username ${username}`, 400);
    res.send(doctor);
};


// :username/pharmacy_requests/:request_id
const respond_to_request = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username, request_id } = req.params;
	const { status, message } = req.body;
	const pharm_request = await PharmacyRequest.findOne({where: {id: request_id}});
	
    if(!pharm_request) throw new ExpressError(`No request with id ${request_id}`, 400);    
    pharm_request.update({status, message});

    res.send({request: pharm_request});
};



// :username/pharmacy_requests
const show_requests = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const requests = await PharmacyRequest.findAll({where: {doctor_username: username}});
	
    res.send(requests);
};



export default {
	index,
	show,
    show_requests,
    respond_to_request,
};
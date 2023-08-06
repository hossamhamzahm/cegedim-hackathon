import express from "express";
import sequelize from "../model/database";
import Patient from "../model/Patient";
import SystemUser from "../model/SystemUser";
import ExpressError from "../helper/ExpressError";





const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { page_no = "1", no_per_pages = "20" } = req.query;

	const limit = parseInt(no_per_pages as string);
	const offset = (parseInt(page_no as string) - 1) * limit;

	const patients = await Patient.findAll({
        offset,
        limit,
        include: {
            model: SystemUser,
            required: true,
        },
        order: [['pid', 'DESC']],
    });

	res.send(patients);
};




const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const patient = await Patient.findOne({where: {username}});
	
    if(!patient) throw new ExpressError(`No patient with username ${username}`, 400);
    res.send(patient);
};




export default {
	index,
	show,
};
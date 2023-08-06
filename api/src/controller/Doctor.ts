import express from "express";
import sequelize from "../model/database";
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




export default {
	index,
	show,
};
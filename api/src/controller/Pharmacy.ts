import express from "express";
import Pharmacy from "../model/Pharmacy";
import SystemUser from "../model/SystemUser";
import ExpressError from "../helper/ExpressError";





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
        order: [['pahrmID', 'DESC']],
    });

	res.send(pahramcies);
};




const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username } = req.params;
	const pharmacy = await Pharmacy.findOne({where: {username}});
	
    if(!pharmacy) throw new ExpressError(`No pharmacy with username ${username}`, 400);
    res.send(pharmacy);
};




export default {
	index,
	show,
};
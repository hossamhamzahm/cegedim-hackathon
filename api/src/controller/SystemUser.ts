import SystemUser from "../model/SystemUser";
import express from "express";
import sequelize from "../model/database";
import Patient from "../model/Patient";
import Doctor from "../model/Doctor";
import Pharmacy from "../model/Pharmacy";





// const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
// 	const { page_no = "1", no_per_pages = "20" } = req.query;

// 	const limit = parseInt(no_per_pages as string);
// 	const offset = (parseInt(page_no as string) - 1) * limit;

// 	const students = await Student.findAll({
//         attributes: ['student_id', 'phone', 'faculty', 'campus', 'gender', 'suspended'],
//         offset,
//         limit,
//         include: {
//             model: User,
//             attributes: ['email', 'f_name', 'l_name', 'createdAt'],
//             required: true,
//         },
//         order: [['student_db_id', 'DESC']],
//     });

// 	res.send(students);
// };



const signup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const { username, email, password, type, firstName, lastName, dateOfBirth, address, phoneNumber, gender, diagnosis, specialization } = req.body as {
		username: string;
		email: string;
		password: string;
		type: string;
		firstName: string;
		lastName: string;
		dateOfBirth?: number;
		phoneNumber?: string;
		gender?: string;
		address?: string;
		diagnosis?: string;
        specialization?: string;
	};
	const transaction = await sequelize.transaction();

	try{
		const systemUser = await SystemUser.create({ username, email, password, type }, { transaction });
		
        if(type == "Patient"){
            const patient = await Patient.create(
                {
                    username,
                    firstName,
                    lastName,
                    dateOfBirth,
                    phoneNumber,
                    gender,
                    address,
                    diagnosis,
                },
                { transaction }
            );
        }
        else if(type == "Doctor"){
            const doctor = await Doctor.create(
                {
                    username,
                    firstName,
                    lastName,
                    specialization,
                },
                { transaction }
            );
        }
		
		await transaction.commit();
	}
	catch(e: unknown){
		await transaction.rollback();
		throw e;
	}

	if(type == "patient") res.redirect("/api-v1/doctors")
	else res.redirect("/api-v1/patients")
};


const login = async (req: express.Request, res: express.Response) => {
    const { username = 'null', password = 'null' } = req.body;

    // searching for the user by email
    const user = await SystemUser.findOne({ where: { username } });
    if(!user) res.status(400).send({Error: 'Wrong username or password'});

    if(user?.getDataValue("type") == ("Patient" || "patient")) return await Patient.findOne({ where: { username }})
    if(user?.getDataValue("type") == ("Doctor" || "doctor")) return await Doctor.findOne({ where: { username }})
    if(user?.getDataValue("type") == ("Pharmacy" || "pharmacy")) return await Pharmacy.findOne({ where: { username }})

    return res.status(200).send(user);
    // if(user.type == res.redirect('/doctors');
};



// const logout = async (req: express.Request, res: express.Response) => {
// 	res.redirect("/users/logout");
// };


export default {
	// index,
	signup,
	login,
	// logout,
};
import SystemUser from "../model/SystemUser";
import express from "express";
import config from "../config";
import sequelize from "../model/database";





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



// const signup = async (req: UserRequest, res: express.Response, next: express.NextFunction) => {
// 	const { , email, password, f_name, l_name, phone, campus, faculty, gender } = req.body.student as {
// 		username: string;
// 		email: string;
// 		password: string;
// 		f_name: string;
// 		l_name: string;
// 		phone: number;
// 		type: string;
// 		faculty: string;
// 		gender: string;
// 		suspended?: string;
// 	};

// 	if(!email.endsWith("@su.edu.eg"))
// 		throw new ExpressError("Only SU students can register student accounts", 400);

// 	const transaction = await sequelize.transaction();
// 	const hashed_password = await bcrypt.hashSync(config.bcrypt_pepper + password, config.salt_rounds);

// 	try{
// 		const user = await User.create({ email, f_name, l_name, hashed_password, type: "student" }, { transaction });
// 		const student = await Student.create(
// 			{
// 				student_db_id: user.getDataValue("user_db_id"),
// 				student_id,
// 				phone,
// 				campus,
// 				faculty,
// 				gender,
// 				suspended: false,
// 			},
// 			{ transaction }
// 		);
		
// 		await transaction.commit();
// 		req.user_db_instance = user;
// 	}
// 	catch(e: unknown){
// 		await transaction.rollback();
// 		throw e;
// 	}

// 	generate_jwt(req, res, next);
// };


const login = async (req: express.Request, res: express.Response) => {
    const { username = 'null', password = 'null' } = req.body.user;

    // searching for the user by email
    const user = await SystemUser.findOne({ where: { username } });
    if(!user) res.status(400).send({Error: 'Wrong username or password'});

    return res.status(200).send(user);
    // if(user.type == res.redirect('/doctors');
};



// const logout = async (req: express.Request, res: express.Response) => {
// 	res.redirect("/users/logout");
// };


export default {
	// index,
	// signup,
	login,
	// logout,
};
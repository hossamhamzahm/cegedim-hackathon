import SystemUser from "./SystemUser";
import Doctor from "./Doctor";
import Patient from "./Patient";



const migrate = async (force = false) => {
    await SystemUser.sync({ force });
    await Patient.sync({ force });
	await Doctor.sync({ force });
}

export default migrate;
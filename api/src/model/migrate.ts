import SystemUser from "./SystemUser";
import Doctor from "./Doctor";
import Patient from "./Patient";
import PharmacyRequest from "./PharmacyRequest";
import Pharmacy from "./Pharmacy";



const migrate = async (force = false) => {
    await SystemUser.sync({ force });
    await Patient.sync({ force });
	await Doctor.sync({ force });
	await Pharmacy.sync({ force });
	await PharmacyRequest.sync({ force });
}

export default migrate;
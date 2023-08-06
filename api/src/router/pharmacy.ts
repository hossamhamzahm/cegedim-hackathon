import express from "express";
import PharmactyController from "../controller/Pharmacy";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.get('/', WrapAsync(PharmactyController.index))
router.get('/:username', WrapAsync(PharmactyController.show))

router.post('/:username/doctor_requests/:doctor_username', WrapAsync(PharmactyController.request_doctor))
router.get('/:username/doctor_requests', WrapAsync(PharmactyController.show_requests))


export default router;
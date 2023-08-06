import express from "express";
import DoctorController from "../controller/Doctor";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.get('/:username', WrapAsync(DoctorController.show))
router.get('/', WrapAsync(DoctorController.index))


router.get('/:username/pharmacy_requests', WrapAsync(DoctorController.show_requests))
router.patch('/:username/pharmacy_requests/:request_id', WrapAsync(DoctorController.respond_to_request))


export default router;
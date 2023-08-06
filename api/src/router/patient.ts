import express from "express";
import PatientController from "../controller/Patient";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.get('/:username', WrapAsync(PatientController.show))
router.get('/', WrapAsync(PatientController.index))

export default router;
import express from "express";
import DoctorController from "../controller/Doctor";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.get('/:username', WrapAsync(DoctorController.show))
router.get('/', WrapAsync(DoctorController.index))

export default router;
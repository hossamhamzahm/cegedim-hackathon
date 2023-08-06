import express from "express";
import PharmactyController from "../controller/Pharmacy";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.get('/:username', WrapAsync(PharmactyController.show))
router.get('/', WrapAsync(PharmactyController.index))

export default router;
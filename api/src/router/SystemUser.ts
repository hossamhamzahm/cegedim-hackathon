import express from "express";
import SystemUserController from "../controller/SystemUser";
import WrapAsync from "../helper/WrapAsync"

const router = express.Router()

router.post('/login', WrapAsync(SystemUserController.login))
router.post('/signup', WrapAsync(SystemUserController.signup))

export default router;
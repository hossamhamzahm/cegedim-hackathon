import express from "express";
import SystemUserController from "../controller/SystemUser";

const router = express.Router()


router.post('/login', SystemUserController.login)

export default router;
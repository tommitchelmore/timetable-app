import { Router } from "express";

import userController from '../controllers/userController'
import validateToken from "../middleware/validateToken";

const router = Router()

router.use(validateToken)

router.get('/user', userController.retrieve)
router.patch('/user', userController.update)
router.delete('/user', userController.delete)

export default router
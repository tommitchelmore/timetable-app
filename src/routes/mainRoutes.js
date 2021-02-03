import { Router } from "express";
import User from '../models/User'

const router = Router()

router.get('/', async (req, res) => {
    res.json(await User.find())
})

export default router
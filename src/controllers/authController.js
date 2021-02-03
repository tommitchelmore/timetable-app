import * as argon2 from "argon2"
import jwt from 'jsonwebtoken'
import UserModel from "../models/User"

export default {
    register: async (req, res) => {
        if (!req.body.email) return res.status(400).json({"error": "No email provided"})
        if (!req.body.password) return res.status(400).json({"error": "No password provided"})
        if (!req.body.displayName) req.body.displayName = req.body.email

        if (await UserModel.findOne({ email: req.body.email })) return res.status(400).json({"error": "A user with that email already exists - did you mean to log in?"})

        const newUser = await UserModel.create({
            email: req.body.email,
            displayName: req.body.displayName,
            password: await argon2.hash(req.body.password, {type: argon2.argon2id})
        })

        newUser.password = '**********'

        return res.json({
            user: newUser,
            token: jwt.sign({
                iss: process.env.PUBLIC_URL,
                iat: Date.now(),
                sub: 'Timetable System',
                user: newUser
            }, process.env.APP_KEY, {
                expiresIn: '24h'
            })
        })
    },
    login: async (req, res) => {
        if (!req.body.email) return res.status(400).json({"error": "No email provided"})
        if (!req.body.password) return res.status(400).json({"error": "No password provided"})
        if (!req.body.displayName) req.body.displayName = req.body.email

        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({"error": "Username or password incorrect"})
        if (!await argon2.verify(user.password, req.body.password)) return res.status(400).json({"error": "Username or password incorrect"})

        user.password = '**********'

        return res.json({
            user: user,
            token: jwt.sign({
                iss: process.env.PUBLIC_URL,
                iat: Date.now(),
                sub: 'Timetable System',
                user: user
            }, process.env.APP_KEY, {
                expiresIn: '24h'
            })
        })

    }
}
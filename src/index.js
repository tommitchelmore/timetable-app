import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {resolve} from 'path'
import server from './server'

dotenv.config({ path: resolve(__dirname, "../.env") })

mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true})

server.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT)
})
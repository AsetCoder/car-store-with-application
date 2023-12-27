import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './Auth/auth.routes.js'
import countryRotes from './Country/country.routes.js'
import brandRoutes from './Brand/brand.routes.js'
import modelRoutes from './Model/model.routes.js'
import carRoutes from './Car/car.routes.js'
import 'colors'

dotenv.config()


const app = express()
const port = process.env.PORT
const url = process.env.URL

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/country', countryRotes)
app.use('/api/brand', brandRoutes)
app.use('/api/model', modelRoutes)
app.use('/api/car', carRoutes)

const connect = async () => {
    await mongoose.connect(url)
    .then(console.log('MongoDb connected Successfully'.italic.bgRed))

    app.listen(port, () => {
        console.log(`Server start on port ${port}📶`.italic.yellow)
    })
} 

connect()

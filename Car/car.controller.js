import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Car from '../Models/Car.js'
import Brand from '../Models/Brand.js'
import Model from '../Models/Model.js'
import User from '../Models/User.js'



export const createCar = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { name, price, images, year, color, kilometer, brand, model } = req.body
    try {
        let isBrand = await Brand.findOne({name: brand})
        if(!isBrand) {
            isBrand = new Brand({name: brand})
        }

        let isModel = await Model.findOne({name: model})
        if(!isModel) {
            isModel = new Model({name: model})
        }
        const car = new Car({name, price, images, year, color, kilometer, brand: isBrand, model: isModel})
        await car.save()

        isBrand.carsCount += 1
        isBrand.cars.push(car.id)
        await isBrand.save()

        isModel.carsCount += 1
        isModel.cars.push(car.id)
        await isModel.save()

        const createdCar = await Car.findOne({name: name})
        res.status(200).json({createdCar})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const getCars = asyncHandler(async(req, res) => {
    const cars = await Car.find()
    res.status(200).json({cars})
})


export const getCarById = asyncHandler(async(req, res) => {
    const { id } = req.params
    
    const car = await Car.findById(id)
    if(!car) {
        res.status(400).json({message: 'Car with this id is not Found'})
    }
    res.status(200).json({car})
})


export const getApplication = asyncHandler(async(req, res) => {
    const userId = req.userId
    const { id } = req.params

    const car = await Car.findById(id)
    if(!car) {
        res.status(400).json({message: 'Car with this id is not Found'})
    }
    const user = await User.findById(userId)
    if(!user) {
        res.status(400).json({message: 'User is not Found'})
    }
    const isHave = car.users.includes(userId)
    if(isHave) {
        res.status(400).json({message: 'Your Application for this Car Already added'})
    }
    car.applicationCount += 1
    car.users.push(user.id)

    user.applicationsCount += 1
    user.applications.push(car.id)
    await user.save()

    await car.save()
    res.status(200).json({message: 'Your Application for this car added'})
})


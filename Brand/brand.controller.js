import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Brand from '../Models/Brand.js'
import Country from '../Models/Country..js'


export const createBrand = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please chech your Request', errors})
    }
    const { name, country } = req.body
    try {
        
        let isCountry = await Country.findOne({name: country})
        if(!isCountry) {
            isCountry = new Country({name: country})
        }
        const brand = new Brand({name, country: isCountry})
        await brand.save()
        
        isCountry.brandsCount += 1
        isCountry.brands.push(brand.id)
        
        await isCountry.save()
        const createdCar = await Brand.findOne({name: name})
        res.status(200).json({createdCar})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const getBrands = asyncHandler(async(req, res) => {
    const brands = await Brand.find()
    res.status(200).json({brands})
})


export const getBrandById = asyncHandler(async(req, res) => {
    const { id } = req.params

    const brand = await Brand.findById(id).populate('models')
    if(!brand) {
        res.status(400).json({message: 'Model is not Found'})  
    }

    res.status(200).json({brand})
})


import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Country from '../Models/Country..js'



export const createCountry = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please chech your Request', errors})
    }
    const { name } = req.body
    try {
        const country = new Country({name})

        await country.save()
        res.status(200).json({country})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const getCountries = asyncHandler(async(req, res) => {
    const countries = await Country.find()
    res.status(200).json({countries})
})


export const getCountryById = asyncHandler(async(req, res) => {
    const { id } = req.params

    const country = await Country.findById(id).populate('brands')
    if(!country) {
        res.status(400).json({message: 'Country is not Found'})  
    }

    res.status(200).json({country})
})


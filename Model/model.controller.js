import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Model from '../Models/Model.js'
import Brand from '../Models/Brand.js'



export const createModel = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please chech your Request', errors})
    }
    const { name, brand } = req.body
    try {
        let isBrand = await Brand.findOne({name: brand})
        if(!isBrand) {
            isBrand = new Brand({name: brand})
        }
        const model = new Model({name, brand: isBrand})
        await model.save()

        isBrand.modelsCount += 1
        isBrand.models.push(model.id)
        await isBrand.save()

        const createdModel = await Model.findOne({name: name})
        res.status(200).json({createdModel})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const getModels = asyncHandler(async(req, res) => {
    const models = await Model.find()
    res.status(200).json({models})
})


export const getModelById = asyncHandler(async(req, res) => {
    const { id } = req.params

    const model = await Model.findById(id).populate('cars')
    if(!model) {
        res.status(400).json({message: 'Model is not Found'})  
    }
    res.status(200).json({model})
})


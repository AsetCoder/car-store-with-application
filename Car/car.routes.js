import express from 'express'
import { check } from 'express-validator'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { createCar, getApplication, getCarById, getCars } from './car.controller.js'



const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty(),
        check('price', 'Price is required').notEmpty(),
        check('images', 'Images is required').isURL(),
        check('year', 'Year is required').notEmpty(),
        check('color', 'Color is required').notEmpty(),
        check('kilometer', 'Kilometer is required').notEmpty(),
        check('brand', 'Brand is required').notEmpty(),
        check('model', 'Model is required').notEmpty(),
    ],
    authSecurity, checkAdmin, createCar
)
router.route('/').get(getCars)
router.route('/:id').get(getCarById)
router.route('/:id/applicate').post(authSecurity, getApplication)


export default router
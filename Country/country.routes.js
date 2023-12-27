import express from 'express'
import { check } from 'express-validator'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { createCountry, getCountries, getCountryById } from './country.controller.js'


const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty()
    ],
    authSecurity, checkAdmin, createCountry
)
router.route('/').get(getCountries)
router.route('/:id').get(getCountryById)


export default router
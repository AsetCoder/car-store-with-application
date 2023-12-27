import express from 'express'
import { check } from 'express-validator'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { createModel, getModelById, getModels } from './model.controller.js'


const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty(),
        check('brand', 'Brand is required').notEmpty()
    ],
    authSecurity, checkAdmin, createModel
)
router.route('/').get(getModels)
router.route('/:id').get(getModelById)


export default router
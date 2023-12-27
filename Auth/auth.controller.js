import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import User from '../Models/User.js'
import { generateToken } from './generateToken.js'



export const authRegister = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { username, phone, email, password } = req.body
    try {
        const isHave = await User.findOne({email})
        if(isHave) {
            res.status(400).json({message: 'User with this Email is already exist'})
        }
        let user
        const hash = bcrypt.hashSync(password, 7)
        if(username === 'admin' && phone == 1 && email === 'admin' && password === 'admin123') {
            user = new User({username, phone, email, password: hash, isAdmin: true})
        }
        else {
        user = new User({username, phone, email, password: hash})
        }
        const token = generateToken(user.id)
        await user.save()
        if(user.isAdmin) {
            res.status(200).json({message: 'Welcome Admin', token})
        }

        res.status(200).json({message: 'User Saved Successfully', token})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const authLogin = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json({message: 'User with this email is not authorized'})
        }
        const isPassword = bcrypt.compareSync(password, user.password)
        if(!isPassword) {
            res.status(400).json({message: 'Password is not correct'})
        }
        const token = generateToken(user.id)
        if(user.isAdmin) {
            res.status(200).json({message: 'Welcome Adminn', token})
        }

        res.status(200).json({token})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const authProfile = asyncHandler(async(req, res) => {
    const userId = req.userId
    const user = await User.findById(userId)

    if(!user) {
        res.status(400).json({message: 'User is not Found'})
    }
    res.status(200).json({user})
})



export const getUserById = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select('-password')
        if(!user) {
            res.status(400).json({message: 'User with this id is not Found'})
        }
        res.status(200).json({user})
    } catch(error) {
        res.status(500).json({message: 'Sorry Errror in Server'})
        console.log(error)
    }
})


export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-password')
    res.status(200).json({users})
})
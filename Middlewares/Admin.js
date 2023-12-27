import User from "../Models/User.js"


export const checkAdmin = async (req, res, next) => {
    const userId = req.userId
    try {
        const admin = await User.findById(userId)
        if(admin.isAdmin !== true) {
            res.status(400).json({message: 'You are not Admin'})
        }
        next()
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Middleware'})
    }
}
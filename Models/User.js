import mongoose from "mongoose"


const User = new mongoose.Schema({
    username: {type: String, required: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    applicationsCount: {type: Number, default: 0},
    applications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}],
    isAdmin: {type: Boolean, default: false}
})

export default mongoose.model('User', User)

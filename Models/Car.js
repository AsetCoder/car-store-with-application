import mongoose from "mongoose"


const Car = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    images: {type: String, required: true},
    year: {type: Number, required: true},
    color: {type: String, required: true},
    kilometer: {type: Number, required: true},
    applicationCount: {type: Number, default: 0},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true},
    model: {type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

export default mongoose.model('Car', Car)

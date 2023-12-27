import mongoose from "mongoose"


const Brand = new mongoose.Schema({
    name: {type: String, required: true},
    modelsCount: {type: Number, default: 0},
    carsCount: {type: Number, default: 0},
    country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
    models: [{type: mongoose.Schema.Types.ObjectId, ref: 'Model'}],
    cars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cars'}]
})

export default mongoose.model('Brand', Brand)

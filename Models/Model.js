import mongoose from "mongoose"


const Model = new mongoose.Schema({
    name: {type: String, required: true},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    cars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}],
})

export default mongoose.model('Model', Model)

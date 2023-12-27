import mongoose from "mongoose"


const Country = new mongoose.Schema({
    name: {type: String, required: true},
    brandsCount: {type: Number, default: 0},
    carsCount: {type: Number, default: 0},
    brands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}]
})

export default mongoose.model('Country', Country)
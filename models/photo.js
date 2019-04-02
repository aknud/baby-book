const mongoose = require("mongoose")
const Schema = mongoose.Schema

const photoSchema = new Schema({
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Photo", photoSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: Photo
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Note", noteSchema)
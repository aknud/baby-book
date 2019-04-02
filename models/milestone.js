const mongoose = require("mongoose")
const Schema = mongoose.Schema

const milestoneSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: Photo
    },
    description: String
})

module.exports = mongoose.model("Milestone", milestoneSchema)
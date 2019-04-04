const express = require("express")
const noteRouter = express.Router()
const Note = require("./../models/note")
const Photo = require("./../models/photo")

noteRouter.get("/", (req, res, next) => {
    Note.find((err, notes) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.send(notes)
    })
})

noteRouter.get("/:_id", (req, res, next) => {
    Note.findOne({_id: req.params._id}, (err, note) => {
        if(err){
            res.status(500)
            return next(err)
        } else if(!note){
            res.status(404)
            return next(new Error("Note not found."))
        }
        return res.send()
    })
})

noteRouter.post("/", async (req, res, next) => {
    const newPhoto = new Photo({image: req.body.image})
    try {
        const photo = await newPhoto.save()
        req.body.image = photo._id
        const newNote = new Note(req.body)
        const savedNote = await newNote.save()
        return res.status(201).send({savedNote, photo})
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

module.exports = noteRouter
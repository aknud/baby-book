const express = require("express")
const noteRouter = express.Router()
const Note = require("./../models/note")
const Photo = require("./../models/photo")

noteRouter.route("/")
    .get((req, res, next) => {
        Note.find((err, notes) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(notes)
        })
    })
    .post( async (req, res, next) => {
        if(req.body.image){
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
        } else {
            const newNote = new Note(req.body)
            try {
                const savedNote = await newNote.save()
                return res.status(201).send(savedNote)
            }
            catch(err){
                res.status(500)
                return next(err)
            }
        }
    })

noteRouter.route("/:_id")
    .get((req, res, next) => {
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
    .put( async (req, res, next) => {
        try {
            if(req.body.image_url){
                const updatedPhoto = await Photo.findOneAndUpdate({_id: req.body.image}, {image: req.body.image_url}, {new: true}, photo => res.status(200).send(photo))
                req.body.image = updatedPhoto._id;const updatedNote = Note.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, note => {
                    return res.status(200).send(note)
                }) 
                return res.status(200).send(updatedNote, updatedPhoto)
            } else {
                const updatedNote = await Note.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (note) => {
                    return res.status(200).send(note)
                })
                return updatedNote
            }
        } 
        catch(err) {
            res.status(500)
            return next(err)
        }
    })
    .delete((req,res, next) => {
        Note.findOneAndDelete({_id: req.params._id}, (err, deletedNote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(`Note with the id of ${deletedNote._id} was successfully deleted.`)
        })
    })


module.exports = noteRouter
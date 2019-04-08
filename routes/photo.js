const express = require("express")
const photoRouter = express.Router()
const Photo = require("../models/photo")


photoRouter.route("/")
    .post((req, res, next) => {
        const newPhoto = new Photo(req.body)
        newPhoto.save((err, photo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(photo)
        })
    })

    .get((req, res, next) => {
        Photo.find((err, photos) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(photos)
        })
    })

photoRouter.route("/:_id")
    .get((req, res, next) => {
        Photo.findOne({_id: req.params._id}, (err,photo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(photo)
        })
    })

    .put((req, res, next) => {
        Photo.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, photo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(photo)
        })
    })

    .delete((req, res, next) => {
        Photo.findOneAndRemove({_id: req.params._id}, (err, deletedPhoto) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(`Photo with the id of ${deletedPhoto._id} was deleted`)
        })
    })



module.exports = photoRouter
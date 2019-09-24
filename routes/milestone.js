const express = require("express")
const milestoneRouter = express.Router()
const Milestone = require("../models/milestone")
// Im importing the Photo model so I can send the image url to the Photo Schema.
const Photo = require("../models/photo")

milestoneRouter.route("/")
    .post( async (req, res, next) => {
        //send the image url to the Photo Schema
        if(req.body.image){
            const newPhoto = new Photo({image: req.body.image})
            //always do a try catch in async await db call otherwise it'll automatically throw an error
            try {
                const photo = await newPhoto.save()
                // reassign req.body.image to equal photo id from db
                req.body.image = photo._id
                const newMilestone = new Milestone(req.body)
                //save the milestone with the photo._id in place of the image url
                const savedMilestone = await newMilestone.save()
                //send back both the milestone and the photo
                return res.status(201).send({savedMilestone, photo})
            }
            catch (err) {
                res.status(500)
                return next(err)
            }
        } else {
            const newMilestone = new Milestone(req.body)
            try {
                const savedMilestone = await newMilestone.save()
                return res.status(201).send(savedMilestone)
            }
            catch(err){
                res.status(500)
                return next(err)
            }
        }
    })

    .get((req, res, next) => {
        Milestone.find((err, milestones) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(milestones)
        })
    })

milestoneRouter.route("/:_id")
    .get((req, res, next) => {
        Milestone.findOne({_id: req.params._id}, (err, milestone) => {
            if(err){
                res.status(500)
                return next(err)
            } else if(!milestone){
                res.status(404)
                return next(new Error("Milestone not found."))
            }
            return res.send(milestone)
        })
    })

    .put( async (req, res, next) => {
        //First check to see if the image url changed ? send an update to Photos : only update milestone
        try {
            if(req.body.image_url){
                const updatedPhoto = await Photo.findOneAndUpdate({_id: req.body.image}, {image: req.body.image_url}, {new: true}, photo => res.status(200).send(photo))
                req.body.image = updatedPhoto._id
                const updatedMilestone = Milestone.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, milestone => {
                    return res.status(200).send(milestone)
                })
                return res.status(200).send(updatedMilestone, updatedPhoto)
            } else {
                const updatedMilestone =  await Milestone.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (milestone) => {
                    return res.status(200).send(milestone)
                })
                return updatedMilestone
            }
        }
        catch(err){
            res.status(500)
            return next(err)
        }

        // Milestone.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, milestone) => {
        //     if(err){
        //         res.status(500)
        //         return next(err)
        //     }
        //     return res.status(200).send(milestone)
        // })
    })
    .delete((req, res, next) => {
        Milestone.findOneAndDelete({_id: req.params._id}, (err, deletedMilestone) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(`Milestone with the id of  ${deletedMilestone._id} was deleted.`)
        })
    })

module.exports = milestoneRouter
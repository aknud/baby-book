const express = require("express")
const milestoneRouter = express.Router()
const Milestone = require("../models/milestone")
// Im importing the Photo model so I can send the image url to the Photo Schema.
const Photo = require("../models/photo")


milestoneRouter.get("/", (req, res, next) => {
    Milestone.find((err, milestones) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.send(milestones)
    })
})

milestoneRouter.get("/:_id", (req, res, next) => {
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

milestoneRouter.post("/", async (req, res, next) => {
    //send the image url to the Photo Schema
    const newPhoto = new Photo({image: req.body.image})
    //always do a try catch in async await db call otherwise it'll automatically throw an error
    try {
        const photo = await newPhoto.save()
        req.body.image = photo._id
        const newMilestone = new Milestone(req.body)
        const savedMilestone = await newMilestone.save()
        return res.status(201).send({savedMilestone, photo})
    }
    catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = milestoneRouter
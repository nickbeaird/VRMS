const express = require("express");
const router = express.Router();

const { ProjectTeamMember } = require("../models/projectTeamMember.model");

// GET /api/projectteammembers/
router.get("/", (req, res) => {
    ProjectTeamMember.find()
        .then((teamMembers) => {
            res.json(teamMembers);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400).json({
                message: `/GET Internal server error:  ${err}`,
            });
        });
});

router.get("/:id", (req, res) => {
    ProjectTeamMember
        .findById(req.params.id)
        .then((teamMembers) => {
            res.status(200).json(teamMembers);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400).json({
                message: `/GET Internal server error:  ${err}`,
            });
        });
});

router.get("/projectowner/:id", (req, res) => {
    ProjectTeamMember
        .find({ userId: req.params.id })
        .then((teamMember) => {
            teamMember.vrmsProjectAdmin === true ?
                res.status(200).json(teamMember) :
                res.status(200).json(false);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400).json({
                message: "/GET Internal server error: " + err,
            });
        });
});

router.post("/", (req, res) => {
    ProjectTeamMember
        .create(req.body)
        .then((teamMember) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400).json({
                message: `/POST Internal server error: ${err}`,
            });
        });
});

router.patch('/:id', (req, res) => {
    // const { headers } = req;
    // const expectedHeader = process.env.CUSTOM_REQUEST_HEADER;

    // if (headers['x-customrequired-header'] !== expectedHeader) {
    //     res.sendStatus(401);
    // } else {
    ProjectTeamMember
        .findByIdAndUpdate(req.params.id, req.body)
        .then(edit => res.json(edit))
        .catch(err =>
            res.status(500).json({
                error: 'Couldn\'t edit team member... Try again.'
            }));
    // };
});

module.exports = router;

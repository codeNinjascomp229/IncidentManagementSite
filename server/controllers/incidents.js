let Incidents = require('../models/incident');
let userModel = require('../models/user');
let User = userModel.User;
let passport = require("passport");

module.exports.getIncidents = (req, res, next) => {
    const promises = [];

    Incidents.find((err, incidents) => {
        if(err){
            console.error(err);
            res.end(err);
        } else {
            const filteredincidents = incidents.filter(incidents => incidents.id);

            filteredincidents.forEach((incidents, i) => {

                const promise = User.findById({"_id": incidents.id}, (err, foundUser) => {
                    if(err) {
                        console.error(err);
                    }
                }).exec();

                promises.push(promise);
            })

            Promise.all(promises).then((values) => {
                let incidentsToReturn = [];
                filteredincidents.forEach((incidents, index) => {
                    incidentsToReturn.push({
                        ...incidents._doc,
                        displayName: values[index].displayName
                    });
                })

                incidentsToReturn.sort((a, b) => (a._id < b._id) ? 1 : -1);

                res.json({
                    error: err,
                    data: incidentsToReturn
                });
            })

        }
    });
};

module.exports.getIncident = (req, res, next) => {
    let id = req.params.id

    Incidents.findById({_id: id}, (err, foundIncident) => {
        if(err){
            console.error(err);
            res.end(err);
        } else {
            res.json({
                error: err,
                data: foundIncident
            });
        }
    });
};

module.exports.addIncident = (req, res, next) => {
    let newIncident = Incidents({
        "id":req.body.id ,
        "incidentNo": req.body.incidentNo,
        "priority": req.body.priority,
        "description": req.body.description,
        "narration": req.body.narration,
        "customerInfo": req.body.narration,
        "status": req.body.status,
        "date": req.body.date,
        "duration": req.body.duration,
        "comment": req.body.comment,
        "assigne": req.body.assigne,
        "resolution": req.body.assigne
    });

    Incidents.create(newIncident, (err, incidents) => {
        if(err){
            console.error(err);
            res.end(err);
        }
        else{
            res.json({
                error:err,
                data: incidents
            });
        }
    });
}

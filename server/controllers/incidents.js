let Incidents = require('../models/incident');
let userModel = require('../models/user');
let User = userModel.User;
let passport = require("passport");
let mongoose = require("mongoose");

module.exports.getIncidents = (req, res, next) => {
    const promises = [];

    Incidents.find((err, incidents) => {
        if (err) {
            console.error(err);
            res.end(err);
        }else{
            res.json({
                error: err,
                data: incidents
            })
        }
    });
};

module.exports.getIncident = (req, res, next) => {
    let id = req.params.id

    Incidents.findById({ _id: id }, (err, foundIncident) => {
        if (err) {
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

    // res.json({
    //     error: null,
    //     data: null
    // });

    let newIncident = Incidents({
        "id": req.body.id,
        "incidentNo": req.body.incidentNo,
        "priority": req.body.priority,
        "description": req.body.description,
        "narration": req.body.narration,
        "customerInfo": req.body.narration,
        "status": req.body.status,
        //"date": req.body.date,
        "duration": req.body.duration,
        "comment": req.body.comment,
        "assigne": req.body.assigne,
        "resolution": req.body.assigne
    });

    Incidents.create(newIncident, (err, incidents) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        else {
            res.json({
                error: err,
                data: incidents
            });
        }
    });
}

module.exports.updateIncident = (req, res, next) => {
    // 
    let id = req.params.id
    let userID = req.body.userID
    
    let newIncident = Incidents({
        "_id": id,
        "id": req.body.id,
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

    

        Incidents.updateOne({_id: id}, newIncident, (err) => {
        if (err) {
          console.error(err);
          res.end(err);
        } else 
        {
          res.json({error: err});
        }
      });
    
    
  }

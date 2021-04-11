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
        } 
        else{

            res.render('/incidents', {title: 'Incidents', Incidents: Incidents});
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
        "resolution": req.body.resolution
    });

    Incidents.create(newIncident, (err, incidents) => {
        if(err){
            console.error(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/incidents');
        }
    });
}

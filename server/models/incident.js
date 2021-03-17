let mongoose = require("mongoose");
 
let incidentSchema = new mongoose.Schema(
  {
    
    incidentNo: Number,
    priority: String,
    description: String,
    narrative: [String],
    customerInfo: String,
    status: {type: String, default: "NEW"},
    date: {type: Date, default: Date.now },
    duration: Number,
    comment: [String],
    assigne: String,
    resolution: String
},
  {
    collection: "incidents",
  }
);
 
module.exports = mongoose.model("Incidents", incidentSchema);
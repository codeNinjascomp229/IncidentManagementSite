let mongoose = require("mongoose");
 
let incidentSchema = new mongoose.Schema(
  {
    id: String,
    incidentNo: Number,
    priority: String,
    description: String,
    narration: [String],
    customerInfo: String,
    status: {type: String, default: "NEW"},
    date: {type: Date, default: Date.now },
    duration: Number,
    comment: [String],
    assigne: String,
    resolution: String
},
  {
    collection: "incident"
  }
);
 
module.exports = mongoose.model("Incidents", incidentSchema);
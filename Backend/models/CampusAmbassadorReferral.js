const mongoose = require("mongoose");

const campusAmbassadorReferralSchema = new mongoose.Schema({
  ambassador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // references the campus ambassador user
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  teamLeaderName: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "CampusAmbassadorReferral",
  campusAmbassadorReferralSchema
);

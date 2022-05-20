const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mriSchema = new Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Mri", mriSchema);

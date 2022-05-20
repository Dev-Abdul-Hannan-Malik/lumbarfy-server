const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// DONE

const reportSchema = new Schema({
  description: {
    type: String,
    required: [true, "Please Enter Content"],
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  mriId: {
    type: mongoose.Types.ObjectId,
    ref: "Mri",
  },
});

module.exports = mongoose.model("Report", reportSchema);

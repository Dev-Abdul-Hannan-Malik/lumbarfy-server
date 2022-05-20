const mongoose = require("mongoose");

// DONE

const prescriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Add a Title"],
    trim: true,
    maxlength: [40, "Limit of Title Reached, Max 40 Characters"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Content"],
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);

const mongoose = require("mongoose");

//DONE

const appointmentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please Add a Title"],
    trim: true,
    maxlength: [40, "Limit of Title Reached, Max 40 Characters"],
  },
  dateTime: {
    type: Date,
    required: true,
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

module.exports = mongoose.model("Appointment", appointmentSchema);

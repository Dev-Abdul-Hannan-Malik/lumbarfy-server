const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// DONE

const doctorSchema = new Schema({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: [true, "Please Add a Name"],
    trim: true,
    maxlength: [40, "Limit of Title Reached, Max 40 Characters"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  nic: {
    type: String,
    required: true,
    // 37405-8930635-1
    maxlength: [15, "Please fill a valid NIC (example => 12345-6789101-1)"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please Enter a Password"],
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);

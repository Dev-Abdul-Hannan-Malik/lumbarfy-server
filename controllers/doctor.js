const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bro";

exports.postAddDoctor = async (req, res, next) => {
  try {
    const { image, name, email, nic, password } = req.body;
    const doctor = new Doctor({ image, name, email, nic, password });
    const result = await doctor.save();
    console.log("Doctor Created!");
    res.json({
      message: "Doctor Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();

    res.json({
      doctors,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.putUpdateDoctor = async (req, res, next) => {
  try {
    const doctorInfo = req.body;
    // Finding the Doctor
    Doctor.findByIdAndUpdate(doctorInfo.doctorId, doctorInfo, (err, doc) => {
      console.log(err);
      if (!doc) {
        res.redirect("/404");
      } else {
        res.json({
          message: "Doctor Updated Successfully",
          status: "success",
          doctor: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteDoctor = (req, res, next) => {
  try {
    const { doctorId } = req.body;
    const id = doctorId;

    Doctor.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        console.log(err);
        return res.redirect("/404");
      }
      if (!doc) {
        res.redirect("/404");
      } else {
        res.json({
          message: "Doctor Deleted Successfully",
          status: "success",
          doctor: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    res.json({
      doctor,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.postDoctorLogin = async (req, res, next) => {
  const { doctor_email, doctor_password } = req.body;
  const doctor = await Doctor.findOne({
    email: doctor_email,
  });

  if (!doctor) {
    return res.status(204).send();
  }

  if (doctor_password != doctor.password) {
    return res.status(205).json({
      status: "failure",
      message: "Passwords do not match",
    });
  }
  const payload = {
    email: doctor.email,
    id: doctor._id,
  };
  let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
  console.log(doctor);
  res.status(200).json({
    status: "success",
    message: "Successfully logged in!",
    token: token,
    userId: doctor._id,
  });
};

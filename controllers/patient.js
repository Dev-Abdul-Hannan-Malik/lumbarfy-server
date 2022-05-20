const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bro";

exports.postAddPatient = async (req, res, next) => {
  try {
    const { image, name, email, nic, password } = req.body;
    const patient = new Patient({ image, name, email, nic, password });
    const result = await patient.save();
    console.log("Patient Created!");
    res.json({
      message: "Patient Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    res.json({
      patients,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.putUpdatePatient = async (req, res, next) => {
  try {
    const patientInfo = req.body;
    // Finding the Patient
    Patient.findByIdAndUpdate(
      patientInfo.patientId,
      patientInfo,
      (err, doc) => {
        console.log(err);
        if (!doc) {
          res.redirect("/404");
        } else {
          res.json({
            message: "Patient Updated Successfully",
            status: "success",
            patient: doc,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deletePatient = (req, res, next) => {
  try {
    const { patientId } = req.body;

    Patient.findByIdAndDelete(patientId, (err, doc) => {
      if (err) {
        console.log(err);
        return res.send("error2");
      }
      if (!doc) {
        res.send(message);
      } else {
        res.json({
          message: "Patient Deleted Successfully",
          status: "success",
          patient: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getPatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    res.json({
      patient,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
exports.postPatientLogin = async (req, res, next) => {
  const { patient_email, patient_password } = req.body;
  const patient = await Patient.findOne({
    email: patient_email,
  });

  if (!patient) {
    return res.status(204).send();
  }

  if (patient_password != patient.password) {
    return res.status(205).json({
      status: "failure",
      message: "Passwords do not match",
    });
  }
  const payload = {
    email: patient.email,
    id: patient._id,
  };
  let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
  console.log(patient);
  res.status(200).json({
    status: "success",
    message: "Successfully logged in!",
    token: token,
    userId: patient._id,
  });
};

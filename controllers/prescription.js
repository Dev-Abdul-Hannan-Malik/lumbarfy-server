const Prescription = require("../models/prescription");

exports.postAddPrescription = async (req, res, next) => {
  try {
    const { title, description, patientId, doctorId } = req.body;
    const prescription = new Prescription({
      title,
      description,
      patientId,
      doctorId,
    });
    const result = await prescription.save();
    console.log("Prescription Created!");
    res.json({
      message: "Prescription Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find();

    res.json({
      prescriptions,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.putUpdatePrescription = async (req, res, next) => {
  try {
    const prescriptionInfo = req.body;
    // Finding the Doctor
    Prescription.findByIdAndUpdate(
      prescriptionInfo.prescriptionId,
      prescriptionInfo,
      (err, doc) => {
        console.log(err);
        if (!doc) {
          res.redirect("/404");
        } else {
          res.json({
            message: "Prescription Updated Successfully",
            status: "success",
            prescription: doc,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deletePrescription = (req, res, next) => {
  try {
    const { prescriptionId } = req.body;

    Prescription.findByIdAndDelete(prescriptionId, (err, doc) => {
      if (err) {
        console.log(err);
        return res.redirect("/404");
      }
      if (!doc) {
        res.redirect("/404");
      } else {
        res.json({
          message: "Prescription Deleted Successfully",
          status: "success",
          prescription: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getPrescription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findById(id);

    res.json({
      prescription,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

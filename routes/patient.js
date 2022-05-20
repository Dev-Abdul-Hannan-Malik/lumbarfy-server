const express = require("express");

const router = express.Router();

const patient_auth = require("../middleware/patient-auth");

//controllers
const patientController = require("../controllers/patient");

// patient/add
router.post("/login", patientController.postPatientLogin);

router.post("/add", patientController.postAddPatient);

router.put("/edit", patientController.putUpdatePatient);

router.delete("/delete", patientController.deletePatient);

router.get("/:id", patientController.getPatient);

router.get("/", patientController.getPatients);

module.exports = router;

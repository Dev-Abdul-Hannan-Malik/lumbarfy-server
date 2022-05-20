const express = require('express');

const router = express.Router();

//controllers
const prescriptionController = require('../controllers/prescription')

// doctor/add
router.post("/add", prescriptionController.postAddPrescription)

router.put("/edit", prescriptionController.putUpdatePrescription)

router.delete("/delete", prescriptionController.deletePrescription)

router.get("/:id", prescriptionController.getPrescription)

router.get("/", prescriptionController.getPrescriptions)


module.exports = router;

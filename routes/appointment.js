const express = require("express");

const router = express.Router();

//controllers
const appointmentController = require("../controllers/appointment");

// doctor/add
router.post("/add", appointmentController.postAddAppointment);

router.put("/edit", appointmentController.putUpdateAppointment);

router.delete("/delete", appointmentController.deleteAppointment);

router.get("/:id", appointmentController.getAppointment);

router.get("/", appointmentController.getAppointments);

module.exports = router;

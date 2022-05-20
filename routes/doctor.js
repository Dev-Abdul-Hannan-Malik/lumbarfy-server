const path = require("path");

const express = require("express");

const router = express.Router();

const doctor_auth = require("../middleware/doctor-auth");

//controllers
const doctorController = require("../controllers/doctor");

router.post("/login", doctorController.postDoctorLogin);

router.post("/add", doctorController.postAddDoctor);

router.put("/edit", doctorController.putUpdateDoctor);

router.delete("/delete", doctorController.deleteDoctor);

router.get("/:id", doctorController.getDoctor);

router.get("/", doctorController.getDoctors);

module.exports = router;

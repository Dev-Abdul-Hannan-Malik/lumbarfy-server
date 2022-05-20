const express = require('express');

const router = express.Router();

//controllers
const mriController = require('../controllers/mri')


router.post("/add", mriController.postAddMri);
router.delete("/delete", mriController.deleteMri);
router.get("/:id", mriController.getMri);
router.get("/", mriController.getMris);


module.exports = router;

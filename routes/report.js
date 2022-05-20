const express = require('express');

const router = express.Router();

//controllers
const ReportController = require('../controllers/report')


router.post("/add", ReportController.postAddReport);
router.get("/:id", ReportController.getReport);
router.get("/", ReportController.getReports);


module.exports = router;
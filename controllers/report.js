const Report = require("../models/report");

exports.postAddReport = async (req, res, next) => {
  try {
    const { description, patientId, mriId } = req.body;
    const report = new Report({ description, patientId, mriId });
    const result = await report.save();
    console.log("Report Created!");
    res.json({
      message: "Report Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const Reports = await Report.find();

    res.json({
      Reports,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    res.json({
      Report,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const Mri = require("../models/mri");

exports.postAddMri = async (req, res, next) => {
  try {
    const { patientId, image } = req.body;
    const mri = new Mri({ patientId, image });
    const result = await mri.save();
    console.log("Mri Created!");
    res.json({
      message: "Mri Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getMris = async (req, res, next) => {
  try {
    const mris = await Mri.find();

    res.json({
      mris,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteMri = (req, res, next) => {
  try {
    const { mId } = req.body;

    Mri.findByIdAndDelete(mId, (err, doc) => {
      if (err) {
        console.log(err);
        return res.redirect("/404");
      }
      if (!doc) {
        res.redirect("/404");
      } else {
        res.json({
          message: "Mri Deleted Successfully",
          status: "success",
          mri: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getMri = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mri = await Mri.findById(id);

    res.json({
      mri,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

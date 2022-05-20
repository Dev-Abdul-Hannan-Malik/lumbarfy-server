const Appointment = require("../models/appointment");

exports.postAddAppointment = async (req, res, next) => {
  try {
    const { category, dateTime, patientId, doctorId } = req.body;
    const appointment = new Appointment({
      category,
      dateTime,
      patientId,
      doctorId,
    });
    const result = await appointment.save();
    console.log("Appointment Created!");
    res.json({
      message: "Appointment Created Successfully!",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();

    res.json({
      appointments,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.putUpdateAppointment = async (req, res, next) => {
  try {
    const appointmentInfo = req.body;
    // Finding the Doctor
    Appointment.findByIdAndUpdate(
      appointmentInfo.appointmentId,
      appointmentInfo,
      (err, doc) => {
        console.log(err);
        if (!doc) {
          res.redirect("/404");
        } else {
          res.json({
            message: "Appointment Updated Successfully",
            status: "success",
            appointment: doc,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteAppointment = (req, res, next) => {
  try {
    const { id } = req.body;

    Appointment.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        console.log(err);
        return res.redirect("/404");
      }
      if (!doc) {
        res.redirect("/404");
      } else {
        res.json({
          message: "Appointment Deleted Successfully",
          status: "success",
          appointment: doc,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    res.json({
      appointment,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

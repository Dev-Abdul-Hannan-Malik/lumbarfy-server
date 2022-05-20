const express = require("express");
const mongoose = require("mongoose");
const { env } = require("process");
const cors = require("cors");

//routes
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const mriRoutes = require("./routes/mri");
const reportRoutes = require("./routes/report");
const prescriptionRoutes = require("./routes/prescription");
const appointmentRoutes = require("./routes/appointment");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/mri", mriRoutes);
app.use("/report", reportRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/appointment", appointmentRoutes);

app.get("/", (req, res, next) => {
  res.json({
    message: "UPDATED with Authentication and Authorization",
    routes: [
      "POST ->/doctor/add",
      "PUT ->/doctor/edit",
      "DELETE ->/doctor/delete",
      "GET -> /doctor",
      "..............................",
      "POST ->/patient/add",
      "PUT ->/patient/edit",
      "DELETE ->/patient/delete",
      "GET -> /patient",
      "..............................",
      "POST -> /mri/add",
      "DELETE -> /mri/delete",
      "GET -> /mri",
      "..............................",
      "POST -> /report/add",
      "GET -> /report",
      "..............................",
      "POST ->/prescription/add",
      "PUT ->/prescription/edit",
      "DELETE ->/prescription/delete",
      "GET -> /prescription",
      "..............................",
      "POST ->/appointment/add",
      "PUT ->/appointment/edit",
      "DELETE ->/appointment/delete",
      "GET -> /appointment",
    ],
  });
});
app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "404",
  });
});

mongoose
  .connect(
    "mongodb+srv://hannan:hannan@tcs.cahgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log("Server started successfully!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

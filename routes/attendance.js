const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

router.post("/add-student", attendanceController.addStudent);

router.post("/add-attendance", attendanceController.addAttendance);

router.get("/get-attendance/:date", attendanceController.getAttendance);

router.get("/get-students", attendanceController.getAllAttendance);

router.put("/update", attendanceController.update);

module.exports = router;

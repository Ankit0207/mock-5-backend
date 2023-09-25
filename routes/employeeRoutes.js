const express = require("express");
const jwt = require("jsonwebtoken");
const { employeeModel } = require("../model/employeeModel");
const employeeRouter = express.Router();


employeeRouter.post("/employees", async (req, res) => {
    try {
        const { first_name, last_name, email, department, salary } = req.body;

        const employee = new employeeModel({ first_name, last_name, email, department, salary });
        await employee.save();
        return res.status(200).json({ msg: "employee added" })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

employeeRouter.get("/", async (req, res) => {
    try {
        const employees = await employeeModel.find();
        return res.status(200).json({ employees });
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

employeeRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await employeeModel.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json({ msg: "details updated" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})

employeeRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await employeeModel.findByIdAndDelete({ _id: id })
        return res.status(200).json({ msg: "employee removed" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
})


module.exports = { employeeRouter };
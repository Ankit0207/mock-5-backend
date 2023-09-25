const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true }
})

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = { employeeModel };
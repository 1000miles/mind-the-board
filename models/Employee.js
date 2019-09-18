const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startingDate: Date,
  leavingDate: Date,
  department: {
    type: String,
    enum: ["Sales", "IT", "HR", "Office Management", "Product", "Ops", "Engineering"]
  },
  jobTitle: String,
  role: {
    type: String,
    enum: ["Admin", "HR-Admin", "Employee"]
  },
  confirmed: Boolean,
  contract_signed: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

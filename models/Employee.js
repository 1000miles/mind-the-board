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
  phone: {
    type: String
  },
  jobTitle: String,
  department: {
    type: String,
    enum: ["Sales", "IT", "HR", "Office Management", "Product", "Ops", "Engineering"]
  },
  startingDate: Date,
  leavingDate: Date,
  confirmed: Boolean,
  contract_signed: Boolean,
  address: {
    address1: String,
    address2: String,
    city: String,
    zip: Number,
    country: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User" // 'User' model
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

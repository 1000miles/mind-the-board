const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hrSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    startingDate: String,
    leavingDate: String,
    department: {
        type: String,
        enum: ["Sales", "IT", "HR", "Office Management", "Product", "Ops"]
    },
    role: String,
    permission: {
        type: String,
        enum: ["Admin", "HR-Admin", "Employee"]
    },
    confirmed: Boolean
});

const HR = mongoose.model("HR", hrSchema);

module.exports = HR;
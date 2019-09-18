const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    title: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dueDate: String,
    confirmedDone: Boolean
});

const user = mongoose.model("User", userSchema);

module.exports = user;
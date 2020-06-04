const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin = new Schema({
    employeeId: String,
    name: String,
    password: String
});

module.exports = mongoose.model("admin", admin);
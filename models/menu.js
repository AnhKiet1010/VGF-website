const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menu = new Schema({
    text: String,
    kids: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("menu", menu);
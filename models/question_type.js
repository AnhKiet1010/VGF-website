const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question_type = new Schema({
    text_en: String,
    text_vi: String,
    text_cn: String,
    kids: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("question_type", question_type);
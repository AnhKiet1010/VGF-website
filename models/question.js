const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema({
    mainQuestion: String,
    question_en: String,
    question_vi: String,
    question_cn: String,
    mainAnswer: String,
    answer_en: String,
    answer_vi: String,
    answer_cn: String,
    created: String,
    updated: String,
    updateBy: String
});

module.exports = mongoose.model("question", question);
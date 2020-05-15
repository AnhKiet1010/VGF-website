const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const news = new Schema({
    title: String,
    desc: String,
    shortDesc: String,
    categoryId: Number,
    time: String,
    image: String,
    views: Number,
    prioritize: Boolean
});

module.exports = mongoose.model("news", news);
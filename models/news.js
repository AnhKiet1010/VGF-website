const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const news = new Schema({
    title_en: String,
    title_vi: String,
    title_cn: String,
    subtitle_en: String,
    subtitle_vi: String,
    subtitle_cn: String,
    content_en: String,
    content_vi: String,
    content_cn: String,
    news_type: String,
    created: String,
    updated: String,
    image: String,
    views: Number,
    editBy: String
});

module.exports = mongoose.model("news", news);
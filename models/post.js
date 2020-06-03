const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posts = new Schema({
    categoryId: String,
    title_en: String,
    title_vi: String,
    title_cn: String,
    subtitle_en: String,
    subtitle_vi: String,
    subtitle_cn: String,
    content_en: String,
    content_vi: String,
    content_cn: String,
    created: String,
    updated: String,
    editBy: String,
    image: String
});

module.exports = mongoose.model("posts", posts);
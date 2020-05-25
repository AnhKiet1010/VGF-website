const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const posts = new Schema({
    mainTitle: String,
    mainSubtitle: String,
    mainContent: String,
    title_en: String,
    title_vi: String,
    title_cn: String,
    subtitle_en: String,
    subtitle_vi: String,
    subtitle_cn: String,
    content_en: String,
    content_vi: String,
    content_cn: String,
    of_page_menu: String,
    of_page_lv1: String,
    of_page_lv2: String,
    created: String,
    updated: String,
    editBy: String
});

module.exports = mongoose.model("posts", posts);
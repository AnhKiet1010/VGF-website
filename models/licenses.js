const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const license = new Schema({
    title_en: String,
    title_vi: String,
    title_cn: String,
    content_en: String,
    content_vi: String,
    content_cn: String,
    license_type: String,
    image: String,
    link: String
});

module.exports = mongoose.model("license", license);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sub_menu_lv2 = new Schema({
    text: String
});

module.exports = mongoose.model("sub_menu_lv2", sub_menu_lv2);
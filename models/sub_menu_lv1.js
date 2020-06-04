const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sub_menu_lv1 = new Schema({
    text: String,
    kids: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("sub_menu_lv1", sub_menu_lv1);
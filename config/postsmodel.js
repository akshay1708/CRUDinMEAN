var mongoose    =   require("mongoose");
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var postSchema  = {
  "heading":String,
  "content":String,
//   "name":String,
// "price":Number
};
// create model if not exists.
module.exports = mongoose.model('postData',postSchema);

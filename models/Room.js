var mongoose = require('mongoose'), Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  name: String,
  course_id: { type: Number },
  members: { type: Array },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);

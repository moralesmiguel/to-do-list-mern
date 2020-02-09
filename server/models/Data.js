const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'data'
});

module.exports = to_do = mongoose.model("data", DataSchema);
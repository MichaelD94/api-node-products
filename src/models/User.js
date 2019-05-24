const mongoose = require ('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  email:{
      type: String,
      unique: true,
      required: true,
      lowercase: true,
  },
  password:{
      type: String,
      required: true,
      select: false,
  },
  isAdmin:{
      type:Boolean,
      default: false
  },
  createdAt:{
      type: Date,
      default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
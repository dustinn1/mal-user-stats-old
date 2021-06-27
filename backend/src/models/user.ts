import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  mal_id: Number,
  access_token: String,
  refresh_token: String,
  updated_on: Date,
  username: String
})

export const User = model('users', userSchema);
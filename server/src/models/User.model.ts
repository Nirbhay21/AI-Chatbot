import mongoose, { Document } from 'mongoose';
import type { InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 20 },
});

export type UserDocument = InferSchemaType<typeof userSchema> & Document;

userSchema.pre<UserDocument>('save', async function (): Promise<void> {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
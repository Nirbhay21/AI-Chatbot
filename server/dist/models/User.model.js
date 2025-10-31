import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, default: 20 },
});
userSchema.pre('save', async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.model.js.map
import { Model, Schema, model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { nanoid } from "nanoid";

const SALT_WORK_FACTOR = 10;

interface IUser {
    username: string;
    password: string;
    token: string;
    checkPassword: (password: string) => boolean;
    generateToken: () => void;
}
const UserSchema = new Schema<IUser, Model<IUser, object>>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  
  });

UserSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.password
        return ret;
    },
})

UserSchema.methods.checkPassword = function(password: string) {
    return bcrypt.compare(password, this.password);
}
UserSchema.methods.generateToken = function() {
    this.token = nanoid();
}

const User = model('user', UserSchema);
export default User;
import { ObjectId } from 'mongoose';
import {UserRole} from '../helpers/enums/UserRole.enum';

export interface IUserWithoutPassword {
  password?: string;
  _id: ObjectId;
  username: string;
  token: string;
  role: UserRole;
}

export interface IUser extends IUserWithoutPassword {
  password: string;
}


export interface IUserMethods {
  generateToken: () => void;
  checkPassword: (password: string) => Promise<boolean>;
}
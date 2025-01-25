import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // Checking if user exists
  

  if (!(await User.isUserExistsByCustomId (payload.id)) ){
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  //   checking if the user is blocked
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //   checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  console.log(isPasswordMatched)
  return {};
};

export const AuthServices = {
  loginUser
};

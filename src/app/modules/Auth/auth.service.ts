import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // Checking if user exists

  const user  = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   checking if the user is already deleted
  // const isDeleted = isUserExists?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  // }

  //   checking if the user is blocked
  // const userStatus = isUserExists?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'User is blocked !');
  // }

  //   checking if the password is correct
  if(!(await User.isPasswordMatched(payload.password,user?.password))){
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }
};

export const AuthServices = {
  loginUser,
};

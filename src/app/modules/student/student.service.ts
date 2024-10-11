import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// Get all students from DB and populate admissionSemester and academicDepartment
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

// Get single student from DB by id and populate admissionSemester and academicDepartment
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({id},payload)
    
    
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    // Start the transaction
    session.startTransaction();

    // Soft-delete the student by setting isDeleted to true
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    // If student is not found, throw an error
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student or student not found');
    }

    // Soft-delete the corresponding user by setting isDeleted to true
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    // If user is not found, throw an error
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user or user not found');
    }

    // Commit the transaction
    await session.commitTransaction();
    
    // End the session
    await session.endSession();

    // Return the deleted student
    return deletedStudent;

  } catch (error) {
    // Abort the transaction if there's an error
    await session.abortTransaction();
    await session.endSession();

    // Propagate the error
    throw error;
  }
};


export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};

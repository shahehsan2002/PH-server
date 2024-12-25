import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // Check if the semester registration ID exists
  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  // Check if the academic faculty ID exists
  const isAcademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  // Check if the academic department ID exists
  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  // Check if the course ID exists
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // Check if the faculty ID exists
  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  //   check if the department is under the faculty

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExist.name} is not  belong to this ${isAcademicFacultyExist.name}`
    );
  }

  // check if the same offered course  same  section in same registers semester is already exist

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section already exists in this semester registration`
    );
  }

  //   Get the schedule of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = { days, startTime, endTime };

  assignedSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);

    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Faculty is not available at this time.`
      );
    }
  });

  // Create the offered course

  //   const result = await OfferedCourse.create({ ...payload, academicSemester });
  //   return result;
  // };
  return null;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};

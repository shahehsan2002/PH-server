import { TAcademicSemesterCode } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemesterCode) => {
  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};

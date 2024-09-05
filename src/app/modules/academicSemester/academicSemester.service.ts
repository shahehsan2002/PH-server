import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.Interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  // checking semester name and semester code
  


  if (academicSemesterNameCodeMapper [payload.name] !== payload.code){
    throw new Error ('Invalid Semester code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};

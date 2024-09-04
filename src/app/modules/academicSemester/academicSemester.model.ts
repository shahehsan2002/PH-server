import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.Interface';

const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: Date, // Change to Number if representing only the year
      required: true,
      enum: AcademicSemesterCode,
    },
    code: {
      type: String, // Corrected to match the TAcademicSemester type
      required: true,
      enum: ['01', '02', '03'], // Validate against specific codes
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);

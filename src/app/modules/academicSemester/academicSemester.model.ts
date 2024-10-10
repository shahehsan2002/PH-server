// import { Schema, model } from 'mongoose';
// import {
//   AcademicSemesterCode,
//   AcademicSemesterName,
//   Months,
// } from './academicSemester.constant';
// import {
//   TAcademicSemester,
//   TAcademicSemesterCode,
// } from './academicSemester.interface';

// const academicSemesterSchema = new Schema<TAcademicSemester>(
//   {
//     name: {
//       type: String,
//       required: true,
//       enum: AcademicSemesterName,
//     },
//     year: {
//       type: String,
//       required: true,
//     },
//     code: {
//       type: String,
//       required: true,
//       enum: AcademicSemesterCode,
//     },
//     startMonth: {
//       type: String,
//       required: true,
//       enum: Months,
//     },
//     endMonth: {
//       type: String,
//       required: true,
//       enum: Months,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// academicSemesterSchema.pre('save', async function (next) {
//   const isSemesterExists = await AcademicSemester.findOne({
//     year: this.year,
//     name: this.name,
//   });

//   if (isSemesterExists) {
//     throw new Error('Semester is already exists !');
//   }
//   next();
// });

// export const AcademicSemester = model<TAcademicSemesterCode>(
//   'AcademicSemester',
//   academicSemesterSchema
// );

// // Name Year
// //2030 Autumn => Created
// // 2031 Autumn
// //2030 Autumn => XXX
// //2030 Fall => Created

// // Autumn 01
// // Summar 02
// // Fall 03


import { Schema, model } from 'mongoose';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName, // Restrict values to specific semester names
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode, // Semester codes (e.g., 01 for Autumn)
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months, // Restrict values to specific months
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months, // Restrict values to specific months
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Middleware to ensure unique combination of name and year before saving
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error(`Semester ${this.name} ${this.year} already exists!`);
  }

  next();
});

export const AcademicSemester = model<TAcademicSemesterCode>(
  'AcademicSemester',
  academicSemesterSchema
);

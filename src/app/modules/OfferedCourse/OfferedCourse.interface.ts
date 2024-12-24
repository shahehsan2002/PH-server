import { Types } from 'mongoose';

export type TDays = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty?: Types.ObjectId;
  course?: Types.ObjectId;
  faculty?: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};

export type TSchedule = {
  day: TDays[];
  startTime: string;
  endTime: string;
};

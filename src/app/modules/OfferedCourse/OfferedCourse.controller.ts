import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OfferedCourseService } from './OfferedCourse.service';

// Create offered Course
const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: result,
  });
});


// Get ALl Offered Course
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.getAllOfferedCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses are retrieved successfully',
    data: result,
  });
})

export const OfferedCourseController = {
  createOfferedCourse,
    getAllOfferedCourses,
};

import httpStatus from 'http-status';

import { RequestHandler  } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createAcademicSemester : RequestHandler =catchAsync (async (req, res, ) => {
  
    // const { password, student: studentData } = req.body;

    

    // const result = await UserServices.createStudentIntoDB(
    //   password,
    //   studentData
    // );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  
});

export const AcademicSemesterControllers = {
    createAcademicSemester,
};

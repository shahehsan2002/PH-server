import {  NextFunction, Request, RequestHandler, Response,  } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import { nextTick } from "process";

const catchAsync = (fn:RequestHandler) =>{

  return(req:Request,res:Response,next:NextFunction)=>{
  Promise.resolve(fn(req,res,next)).catch(err => nextTick(err))
}
};


const getSingleStudent= catchAsync(async (req, res, next) => {
  
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
},

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted succesfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};

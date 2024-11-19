/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  type TErrorSources = {
    path: string;
    message: string;
  }[];
  

  const errorSources: TErrorSources = [{
    path:'',
    message: 'Something went wrong!',
  }];

  // if (err instanceof ZodError) {
  //   statusCode = 400;
  //   message = 'Validation Error from ZodError';
  // }
  
  // Ultimate error return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};

export default globalErrorHandler;

// Pattern for error handling

/*
success
message
errorSources:[
path: ''
message: ''
]
stack
*/

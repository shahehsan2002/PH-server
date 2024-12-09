/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
// Default error response values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

 
  const errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

   // Function to handle ZodError
  const handleZorError = (error: ZodError) => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => ({
      return: {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      },
    }));
    const statusCode = 400;

    return {
      statusCode,
      message: 'Validation Error ',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZorError(err);
    statusCode = simplifiedError?.statusCode;

    message = simplifiedError?.message;

    errorSources = simplifiedError?.errorSources;
  }

  // Ultimate error return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
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

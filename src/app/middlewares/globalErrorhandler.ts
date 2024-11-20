/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  type TErrorSources = {
    path: string;
    message: string;
  }[];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

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
      message: 'Validation Error from ZodError',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZorError(err);

    message = 'Validation Error from ZodError';
  }

  // Ultimate error return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
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

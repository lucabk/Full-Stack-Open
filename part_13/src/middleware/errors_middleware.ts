import { StatusCodes } from 'http-status-codes'
import { ValidationError } from "sequelize";
import { z } from 'zod';
import express from "express";
import { CustomError } from '../utils/type';

export const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('errorMiddleware:',error);

    // Custom error handling
    if ((error as CustomError).msg && (error as CustomError).statusCode){
      const err = error as CustomError
      res.status(err.statusCode).json({ error : err.msg })
      return
    }

    //Sequelize error handling
    if(error instanceof ValidationError){
      res.status(StatusCodes.CONFLICT).json({ error : error.errors[0].message })
      return //return before calling Express error handler with next(error), avoiding console errors output
    }

    //JWT error handling TODO

    //Zod error handling
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return
    } 
    next(error)
  };
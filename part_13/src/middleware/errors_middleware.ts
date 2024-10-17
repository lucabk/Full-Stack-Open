import { StatusCodes } from 'http-status-codes'
import { ValidationError } from "sequelize";
import { z } from 'zod';
import express from "express";
import { ErrorMsg } from '../utils/errorFactory';

export const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('errorMiddleware:',error);

    // Factory error handling
    if ((error as ErrorMsg).msg && (error as ErrorMsg).statusCode){
      const err = error as ErrorMsg
      res.status(err.statusCode).json({ error : err.msg })
      return
    }

    //Sequelize error handling
    if(error instanceof ValidationError){
      res.status(StatusCodes.CONFLICT).json({ error : error.errors[0].message })
      return //return before calling Express error handler with next(error), avoiding console errors output
    }

    //Zod error handling
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return
    } 
    next(error)
  };
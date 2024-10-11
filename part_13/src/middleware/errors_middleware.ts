import { StatusCodes } from 'http-status-codes'
import { ValidationError } from "sequelize";
import { z } from 'zod';
import express from "express";

export const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(error);

    //Sequelize error handling
    if(error instanceof ValidationError){
      if(error.name === 'SequelizeUniqueConstraintError'){
        res.status(StatusCodes.CONFLICT).json({ error : 'username must be unique' })
        return //return before calling Express error handler with next(error), avoiding console errors output
      }
    }
 
    //Zod error handling
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return
    } 
    next(error)
  };
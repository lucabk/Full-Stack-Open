import { StatusCode } from "../utils/type";
import { ValidationError } from "sequelize";
import { z } from 'zod';
import express from "express";

export const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(error);
    if(error instanceof ValidationError){
      res.status(StatusCode.BadRequest).json({ error : 'Sequelize notNull Violation' })
      return //return before calling Express error handler with next(error), avoiding console errors output
    }
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return
    } 
    next(error)
  };
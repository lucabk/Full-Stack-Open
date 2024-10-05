import { Request, Response, NextFunction } from 'express';
import { newEntrySchema } from './utils';
import { z } from 'zod';

//receives the request body as a parameter and returns a properly-typed newPatientEntry object.
export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
//after the request passes this middleware, it is known that the request body is a proper new patient entry, otherwise:
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
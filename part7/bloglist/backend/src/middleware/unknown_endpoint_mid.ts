import { StatusCodes } from  'http-status-codes'
import { Request, Response } from 'express';

//This middleware will be used for catching requests made to non-existent routes
export const unknownEndpoint = (_req:Request, res:Response) => {
    res.status(StatusCodes.NOT_FOUND).send({ error: 'unknown endpoint' })
  }


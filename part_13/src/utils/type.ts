import { z } from 'zod';

export enum StatusCode {
    Ok = 200,
    Created=201,
    NoContent=204,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError=500
}


//ZOD for POST validation
export const newEntrySchema = z.object({
    author : z.string().min(1).max(255).optional(),
    url : z.string().url(),
    title : z.string().min(1).max(255),
    likes : z.number().int().nonnegative().default(0)
})
export type newBlogEntry = z.infer< typeof newEntrySchema >

//ZOD for PUT validation
export const newLikeSchema = z.object({
    likes : z.number().int().nonnegative()
})
export type newLikeEntry = z.infer< typeof newLikeSchema >
import { z } from 'zod';

//ZOD for Blog POST validation
export const newEntrySchema = z.object({
    author : z.string().min(1).max(255).optional(),
    url : z.string().url(),
    title : z.string().min(1).max(255),
    likes : z.number().int().nonnegative().default(0),
    year : z.number().int().min(1991).max(new Date().getFullYear()).optional()
})
export type newBlogEntry = z.infer< typeof newEntrySchema >

//ZOD for Blog PUT validation
export const newLikeSchema = z.object({
    likes : z.number().int().nonnegative()
})
export type newLikeEntry = z.infer< typeof newLikeSchema >

//ZOD for User POST validation
export const newUserSchema = z.object({
    name : z.string().min(1).max(255),
    username: z.string().min(1).max(255),
    password: z.string().min(8).max(255)
})
export type newUserEntry = z.infer < typeof newUserSchema >

//ZOD for User PUT validation (and for Login POST validation)
export const newUsernameSchema = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(8).max(255)
})
export type newUsernameEntry = z.infer < typeof newUsernameSchema >

//Custom Error
export interface CustomError {
    msg: string
    statusCode: number
}
import { z } from 'zod';
import { newEntrySchema } from './utils'

export interface diagnoseEntry{
    code:string,
    name:string,
    latin?:string
}

export enum Gender {
    Male='male',
    Female='female',
    Other='other'
} 

export interface patientEntry{
    id:string
    name:string
    dateOfBirth:string
    ssn:string
    gender:Gender
    occupation:string
}

export type patientEntryFiltered = Omit<patientEntry, 'ssn'>

// infer the type from schema
export type newPatientEntry = z.infer<typeof newEntrySchema>; 
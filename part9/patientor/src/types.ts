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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

export interface patientEntry{
    id:string
    name:string
    dateOfBirth:string
    ssn?:string
    gender:Gender
    occupation:string
    entries:Entry[]
}

export type patientEntryFiltered = Omit<patientEntry, 'ssn' | 'entries'>

// infer the type from schema
export type newPatientEntry = z.infer<typeof newEntrySchema>; 
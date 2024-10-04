export interface diagnoseEntry{
    code:string,
    name:string,
    latin?:string
}

type Gender = 'male' | 'female' | 'other' 
interface patientEntry{
    id:string
    name:string
    dateOfBirth:string
    ssn?:string
    gender:Gender
    occupation:string
}

export type patientEntryFiltered = Omit<patientEntry, 'ssn'>
import { Gender, newPatientEntry } from "./types"

//receives the request body as a parameter and returns a properly-typed newPatientEntry object.
const toNewPatientEntry = (object:unknown):newPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newEntry:newPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }
        return newEntry
    }    
    throw new Error('Incorrect data: some fields are missing');
}

const parseName = (name:unknown):string => {
    if(!name || !isString(name))// check that it exists and to ensure that it is of the type string
        throw new Error('Incorrect or missing name')
    return name
}
const parseDateOfBirth = (dateOfBirth:unknown):string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth))
        throw new Error('Incorrect or missing dateOfBirth'+dateOfBirth)
    return dateOfBirth
}

const parseSsn = (ssn:unknown):string => {
    if(!ssn || !isString(ssn))
        throw new Error('Incorrect or missing ssn')
    return ssn
}

const parseGender = (gender:unknown):Gender => {
    if(!gender || !isString(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender'+gender)
    return gender
}

const parseOccupation = (occupation:unknown):string => {
    if(!occupation || !isString(occupation))
        throw new Error('Incorrect or missing occupation')
    return occupation
}

//type validations
const isString = (text: unknown): text is string => {//string validation function (type guard: returns a boolean and has a type predicate as the return type. )
    return typeof text === 'string' || text instanceof String;//There are two different ways to create string in JavaScript, one as a primitive and the other as an object
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const isGender = (gender:string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
}

export default toNewPatientEntry 
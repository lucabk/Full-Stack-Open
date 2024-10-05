import { Gender, newPatientEntry } from "./types"
import { z } from 'zod';

//receives the request body as a parameter and returns a properly-typed newPatientEntry object.
const toNewPatientEntry = (object:unknown):newPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        const newEntry:newPatientEntry = {
            name:  z.string().parse(object.name),// ensure that it is of the type string
            dateOfBirth:  z.string().date().parse(object.dateOfBirth),//validates if a string is a valid date
            ssn: z.string().parse(object.ssn),
            gender: z.nativeEnum(Gender).parse(object.gender),//Zed has also support for enums
            occupation: z.string().parse(object.occupation)
        }
        return newEntry
    }    
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry 
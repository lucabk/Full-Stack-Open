import { Gender, newPatientEntry } from "./types"
import { z } from 'zod';

// define the whole new patient entry as a Zod object schema:
export const newEntrySchema = z.object({
    name : z.string(),
    dateOfBirth : z.string().date(),
    ssn : z.string(),
    gender : z.nativeEnum(Gender),
    occupation : z.string()
})


//receives the request body as a parameter and returns a properly-typed newPatientEntry object.
const toNewPatientEntry = (object:unknown):newPatientEntry => {
    return newEntrySchema.parse(object)
}
export default toNewPatientEntry
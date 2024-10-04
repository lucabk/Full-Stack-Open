import diagnosesData from '../../data/diagnoses'
import { diagnoseEntry } from '../types'

//Diagnoses
const diagnoses: diagnoseEntry[] = diagnosesData
const getDiagnoses = ():diagnoseEntry[] => {
    return diagnoses
}

const addData = () => {
    return null
}



export default { getDiagnoses, addData }
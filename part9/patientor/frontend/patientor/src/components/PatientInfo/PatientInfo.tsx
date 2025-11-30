import { useEffect, useState } from "react";
import { Diagnosis, patientEntry } from "../../types";
import patientService from "../../services/patients";
import { Typography, Card, CardContent } from '@mui/material';

interface PatientInfoProps {
    patientId : string | undefined;
    diagnoses : Diagnosis[];
}

const PatientInfo = ({ patientId, diagnoses } : PatientInfoProps) => {

    const [patientInfo, setPatientInfo] = useState<patientEntry|null>(null);

    useEffect(() => {
        if(typeof patientId === "string"){
            patientService
                .getById(patientId)
                .then(res => setPatientInfo(res))
                .catch(e => console.error("Error finding patient: ", e));
        }
    }, []);

    //console.log("patient info: ", patientInfo);

    return (
        <>
            { patientInfo !== null ? (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {patientInfo.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mt:2 }}>
                            SSN: {patientInfo.ssn}
                        </Typography>
                        <Typography variant="body1" sx={{ mt:1 }}>
                            Occupation: {patientInfo.occupation}
                        </Typography>
                        <Typography sx={{ mt:1 }}>
                            <strong>entries</strong><br/>
                            {patientInfo.entries.map(e => (
                                <div key={e.id}>
                                    {e.date} <em>{e.description}</em>
                                    <ul>
                                        {e.diagnosisCodes?.map(code => (
                                            <li key={code}>
                                                {code} {diagnoses.find(d => d.code === code)?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <p>Patient with id {patientId} not found</p>
                </div>
            )}
        </>
    );
};

export default PatientInfo;
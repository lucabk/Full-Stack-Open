import { useEffect, useState } from "react";
import { patientEntry } from "../../types";
import patientService from "../../services/patients";
import { Typography, Card, CardContent } from '@mui/material';

const PatientInfo = ({ patientId } : { patientId : string | undefined}) => {

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
                        <Typography variant="body1">
                            SSN: {patientInfo.ssn}
                        </Typography>
                        <Typography variant="body1">
                            Occupation: {patientInfo.occupation}
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
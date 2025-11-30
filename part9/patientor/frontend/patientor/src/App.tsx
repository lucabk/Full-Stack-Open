import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import diagonosisService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagonosisService.getAll();
      setDiagnoses(diagnoses);
    };
    
    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);
  
  const matchPatientId = useMatch('/patients/:id');
  const patientId = matchPatientId ?
    matchPatientId.params.id :
    undefined;

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfo patientId={patientId} diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;

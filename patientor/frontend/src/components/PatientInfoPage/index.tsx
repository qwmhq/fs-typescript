import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Diagnosis, Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import { Box, Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const GenderIcon = ({ gender }: { gender: Gender }) => {
  if (gender === Gender.Male) {
    return <MaleIcon />;
  } else if (gender === Gender.Female) {
    return <FemaleIcon />;
  }
};

const PatientInfoPage = ({ diagnoses }: Props) => {
  const id = useParams().id!;
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    fetchPatient();
  }, [id]);

  if (!patient || !diagnoses) return null;

  return (
    <Box style={{ marginTop: "24px" }}>
      <Typography variant="h4">
        {patient.name} <GenderIcon gender={patient.gender} />{" "}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      {patient.entries && patient.entries.length > 0 && (
        <>
          <Typography variant="h5" style={{ marginTop: "16px" }}>
            entries
          </Typography>
          <Box style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {patient.entries.map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
          </Box>
        </>
      )}
      <Button style={{ marginTop: "16px" }} variant="contained" color="primary">
        add new entry
      </Button>
    </Box>
  );
};

export default PatientInfoPage;

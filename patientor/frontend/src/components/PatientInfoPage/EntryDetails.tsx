import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import { assertNever } from "../../helpers";
import { List, ListItem } from "@mui/material";

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  const healthRatingColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return assertNever(rating);
    }
  };
  return (
    <div
      style={{ border: "1px solid grey", borderRadius: "16px", padding: "8px" }}
    >
      <div>
        {entry.date} <MedicalServicesIcon />
      </div>
      <div style={{ marginTop: "4px" }}>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes && (
        <List>
          {entry.diagnosisCodes.map((code, idx) => (
            <ListItem key={idx}>
              {code} {diagnoses.find((x) => x.code == code)?.name}
            </ListItem>
          ))}
        </List>
      )}
      <FavoriteIcon htmlColor={healthRatingColor(entry.healthCheckRating)} />
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <div
      style={{ border: "1px solid grey", borderRadius: "16px", padding: "8px" }}
    >
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div style={{ marginTop: "4px" }}>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes && (
        <List>
          {entry.diagnosisCodes.map((code, idx) => (
            <ListItem key={idx}>
              {code} {diagnoses.find((x) => x.code == code)?.name}
            </ListItem>
          ))}
        </List>
      )}
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthCareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
  return (
    <div
      style={{ border: "1px solid grey", borderRadius: "16px", padding: "8px" }}
    >
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>
      <div style={{ marginTop: "4px" }}>
        <i>{entry.description}</i>
      </div>
      {entry.diagnosisCodes && (
        <List>
          {entry.diagnosisCodes.map((code, idx) => (
            <ListItem key={idx}>
              {code} {diagnoses.find((x) => x.code == code)?.name}
            </ListItem>
          ))}
        </List>
      )}
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

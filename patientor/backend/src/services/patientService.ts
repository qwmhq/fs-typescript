import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patient } = p;
    return patient;
  });
};

const addPatient = (object: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...object };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };

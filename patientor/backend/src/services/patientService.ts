import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
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
  const newPatient = { id, entries: [], ...object };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, object: NewEntry): Entry | null => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) return null;

  const entryId = uuid();
  const entry = { id: entryId, ...object };
  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};

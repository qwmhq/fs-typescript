import { z } from "zod";
import { NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

import { z } from "zod";
import { NewPatientSchema } from "./utils";

const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});
export type Diagnosis = z.infer<typeof DiagnosisSchema>;

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: DiagnosisSchema.shape.code.array().optional(),
});

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

const OccupationalHealthCareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});
export type OccupationalHealthCareEntry = z.infer<
  typeof OccupationalHealthCareEntrySchema
>;

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthCareEntrySchema,
  HospitalEntrySchema,
]);
export type Entry = z.infer<typeof EntrySchema>;

const newEntryOmits = { id: true } as const;

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit(newEntryOmits),
  OccupationalHealthCareEntrySchema.omit(newEntryOmits),
  HospitalEntrySchema.omit(newEntryOmits),
]);
export type NewEntry = z.infer<typeof NewEntrySchema>;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof NewPatientSchema>;

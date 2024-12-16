import express, { Response } from "express";
import { z } from "zod";
import { NewEntry, NewEntrySchema, NonSensitivePatient } from "../types";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";
import { validateData } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (!patient) res.status(404).end();
  res.send(patient);
});

router.post("/", (req, res, next) => {
  try {
    const patient = NewPatientSchema.parse(req.body);
    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  }
});

router.post("/:id/entries", validateData(NewEntrySchema), (req, res) => {
  const id = req.params.id;
  const newEntry = req.body as NewEntry;
  const createdEntry = patientService.addEntry(id, newEntry);
  if (createdEntry === null) res.status(404).end();
  res.json(createdEntry);
});

export default router;

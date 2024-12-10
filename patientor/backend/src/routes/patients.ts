import express, { Response } from "express";
import { z } from "zod";
import { NonSensitivePatient } from "../types";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
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

export default router;

import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("<p>Hello Full Stack!</p>");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const bmiResult = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi: bmiResult,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" }).end();
  }
  if (
    isNaN(target) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((x) => isNaN(Number(x)))
  ) {
    res.status(400).send({ error: "malformatted parameters" }).end();
  }

  const exerciseResult = exerciseCalculator(daily_exercises, target);
  res.send(exerciseResult);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

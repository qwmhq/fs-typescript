import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/ping", pingRouter);

app.use("/api/patients", patientRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express, { Request, Response } from "express";

import { Box } from "./types/box.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/api/v1/boxes", (req: Request, res: Response) => {
  res.status(201).json({
    description: "Lista wszystkkich pudełek",
    data: {},
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serwer śmiga pod adresem: http://localhost:${PORT}`);
});

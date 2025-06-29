import express from "express";
import cors from "cors";

import generateReview from "./review.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-code-review-frontend-pmuo.vercel.app",
    ],
  })
);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.post("/api/v1/reviews", async (req, res) => {
  const code = req.body.code;

  try {
    const review = await generateReview(code);

    return res.send({
      review,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

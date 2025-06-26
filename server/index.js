import express from "express";
import { quoteService, QuoteService } from "./src/services/QuoteService.js";

const app = express();
const PORT = 3000;

app.get("/api/quotes", (req, res) => {
  res.json(QuoteService.getAllQuotes());
});

app.get("/api/quotes/random-single", (req, res) => {
  res.json(quoteService.getRandomQuote());
});

app.listen(PORT, () => {
  console.log(`Quotes API service is running on PORT ${PORT}`);
});

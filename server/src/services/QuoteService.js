import quotes from "../data/quotes.js";
import { getRandomIndex } from "../utils/mathUtils.js";

class QuoteService {
  constructor() {
    this.lastRandomExcludedIndex = -1;
  }

  getRandomQuote() {
    const randomIndex = getRandomIndex(
      quotes.length,
      this.lastRandomExcludedIndex
    );
    this.lastRandomExcludedIndex = randomIndex;

    return quotes[randomIndex];
  }

  static getAllQuotes() {
    return quotes;
  }
}

const quoteService = new QuoteService();

export { quoteService, QuoteService };

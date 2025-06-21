import { Quote } from "./Quote.js";
import { getRandomIndex } from "../utils/mathUtils.js";

class QuoteProvider {
  static getRandomQuoteFromArray(quotesArray, excludedIndex = -1) {
    const randomIndex = getRandomIndex(quotesArray.length, excludedIndex);

    const randomQuoteObj = quotesArray[randomIndex];
    const randomQuote = Quote.createFromObject(randomQuoteObj);
    return [randomQuote, randomIndex];
  }
}

export default QuoteProvider;

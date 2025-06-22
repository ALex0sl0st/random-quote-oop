import { Quote } from "./Quote.js";
import { getRandomIndex } from "../utils/mathUtils.js";

class QuoteProvider {
  static lastRandomIndex = -1;

  static getRandomQuoteFromArray(
    quotesArray,
    excludedIndex = QuoteProvider.lastRandomIndex
  ) {
    const randomIndex = getRandomIndex(quotesArray.length, excludedIndex);

    QuoteProvider.lastRandomIndex = randomIndex;

    const randomQuote = Quote.createFromObject(quotesArray[randomIndex]);
    return randomQuote;
  }

  static setLastRandomIndex(index) {
    QuoteProvider.lastRandomIndex = index;
  }
}

export default QuoteProvider;

import { Quote } from "./Quote.js";
import { getRandomIndex } from "../utils/mathUtils.js";

class QuoteProvider {
  static lastRandomIndex = -1;

  static setLastRandomIndex(index) {
    QuoteProvider.lastRandomIndex = index;
  }

  static getRandomQuoteFromArray(
    quotesArray,
    excludedIndex = QuoteProvider.lastRandomIndex
  ) {
    const randomIndex = getRandomIndex(quotesArray.length, excludedIndex);

    QuoteProvider.lastRandomIndex = randomIndex;

    const randomQuote = Quote.createFromObject(quotesArray[randomIndex]);
    return randomQuote;
  }

  static async getRandomQuoteViaAPI(
    url = "https://quoteslate.vercel.app/api/quotes/random"
  ) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { id, quote: text, author } = data;
      return Quote.createFromObject({ id, text, author });
    } catch (error) {
      // console.log("CUSTOM ERROR");
      console.error(error);

      return null;
    }
  }
}

export default QuoteProvider;

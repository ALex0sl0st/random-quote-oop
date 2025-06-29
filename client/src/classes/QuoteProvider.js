import { Quote } from "./Quote.js";
import { getRandomIndex } from "../utils/mathUtils.js";
import config from "../utils/config.js";

class QuoteProvider {
  static onlineRandomQuoteUrl = `${config.PUBLIC_API_URL}/api/quotes/random`;
  static serverRandomQuoteUrl = `${config.LOCAL_API_URL}/api/quotes/random-single`;

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

  static async getRandomQuoteViaAPI(url = QuoteProvider.onlineRandomQuoteUrl) {
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

  static async getRandomQuoteFromServer(
    url = QuoteProvider.serverRandomQuoteUrl
  ) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { id, text, author } = data;
      return Quote.createFromObject({ id, text, author });
    } catch (error) {
      // console.log("CUSTOM ERROR");
      console.error(error);

      return null;
    }
  }
}

export default QuoteProvider;

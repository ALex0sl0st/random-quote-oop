import {
  LOCAL_STORAGE_KEYS,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorageUtils.js";
import { Quote } from "../Quote.js";

class CurrentQuoteManager {
  constructor() {
    this.currentQuote = null;
  }

  update(quote) {
    this.currentQuote = quote;
    saveToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_QUOTE, this.currentQuote);
  }

  getCurrentQuote() {
    return this.currentQuote;
  }

  getCurrentQuoteId() {
    return this.currentQuote ? this.currentQuote.id : null;
  }

  loadFromLocalStorage() {
    const quoteObj = loadFromLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_QUOTE);
    this.currentQuote = quoteObj ? Quote.createFromObject(quoteObj) : null;
  }
}

const currentQuoteManager = new CurrentQuoteManager();

export default currentQuoteManager;

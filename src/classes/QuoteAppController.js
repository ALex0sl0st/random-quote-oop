import quotes from "../data/quotes.js";
import QuoteProvider from "./QuoteProvider.js";
import { toggleFavoriteQuote } from "../handlers/favoritesHandler.js";
import currentQuoteManager from "./storage/CurrentQuoteManager.js";
import { appUI } from "./AppUI.js";

class QuoteAppController {
  constructor() {
    this.localQuoteBtn = document.getElementById("local-quote-btn");
    this.onlineQuoteBtn = document.getElementById("online-quote-btn");
    this.starElement = document.getElementById("star");

    this.isGatingAPIQuote = false;
  }

  setCurrentQuote(quote) {
    currentQuoteManager.update(quote);
    appUI.displayCurrentQuote(
      currentQuoteManager.getCurrentQuote(),
      this.starElement
    );
  }

  setLocalRandomQuote() {
    const randomQuote = QuoteProvider.getRandomQuoteFromArray(quotes);
    this.setCurrentQuote(randomQuote);
  }

  async setOnlineRandomQuote() {
    if (this.isGatingAPIQuote) return;

    this.isGatingAPIQuote = true;
    QuoteAppController.setButtonState(this.onlineQuoteBtn, false);

    try {
      const randomQuote = await QuoteProvider.getRandomQuoteViaAPI();
      if (randomQuote) this.setCurrentQuote(randomQuote);
    } finally {
      this.isGatingAPIQuote = false;
      QuoteAppController.setButtonState(this.onlineQuoteBtn, true);
    }
  }

  static setButtonState(button, isEnabled) {
    button.disabled = !isEnabled;
  }

  init() {
    this.localQuoteBtn.addEventListener("click", () =>
      this.setLocalRandomQuote()
    );
    this.onlineQuoteBtn.addEventListener("click", () =>
      this.setOnlineRandomQuote()
    );
    this.starElement.addEventListener("click", () => {
      toggleFavoriteQuote(this.starElement);
    });
  }
}

const quoteAppController = new QuoteAppController();

export { quoteAppController };

// console.log(
//   "First",
//   quotes.filter((el) => isQuoteFavorite(el.id))
// );

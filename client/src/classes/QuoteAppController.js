import quotes from "../data/quotes.js";
import QuoteProvider from "./QuoteProvider.js";
import { toggleFavoriteQuote } from "../handlers/favoritesHandler.js";
import currentQuoteManager from "./storage/CurrentQuoteManager.js";
import { appUI } from "./AppUI.js";
import { Quote } from "./Quote.js";

class QuoteAppController {
  constructor() {
    this.localQuoteBtn = document.getElementById("local-quote-btn");
    this.onlineQuoteBtn = document.getElementById("online-quote-btn");
    this.starElement = document.getElementById("star");

    this.isGatingAPIQuote = false;
  }

  setCurrentQuote(quote) {
    if (quote instanceof Quote) {
      currentQuoteManager.update(quote);
      appUI.displayCurrentQuote(
        currentQuoteManager.getCurrentQuote(),
        this.starElement
      );
    }
  }

  setLocalRandomQuote() {
    const randomQuote = QuoteProvider.getRandomQuoteFromArray(quotes);
    this.setCurrentQuote(randomQuote);
  }

  async setOnlineRandomQuote() {
    if (this.isGatingAPIQuote) return;

    this.setIsFetchingQuote(true);

    const randomQuote = await QuoteProvider.getRandomQuoteViaAPI();
    this.setCurrentQuote(randomQuote);

    this.setIsFetchingQuote(false);
  }

  setIsFetchingQuote(isFetching) {
    this.isGatingAPIQuote = isFetching;
    QuoteAppController.setButtonState(this.onlineQuoteBtn, !isFetching);
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

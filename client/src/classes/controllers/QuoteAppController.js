import quotes from "../../data/quotes.js";
import QuoteProvider from "../QuoteProvider.js";
import { favoriteQuotesController } from "./FavoriteQuotesController.js";
import currentQuoteManager from "../storage/CurrentQuoteManager.js";
import { appUI } from "../AppUI.js";
import { Quote } from "../Quote.js";
import { favoritesPaginator } from "./FavoritesPaginator.js";

class QuoteAppController {
  constructor() {
    this.localQuoteBtn = document.getElementById("local-quote-btn");
    this.serverQuoteBtn = document.getElementById("server-quote-btn");
    this.onlineQuoteBtn = document.getElementById("online-quote-btn");

    this.removeAllFavoriteQuotesBtn = document.getElementById("remove-all-btn");

    this.starElement = document.getElementById("star");

    this.isGatingOnlineQuote = false;
    this.isGatingServerQuote = false;

    this.firstPageBtn = document.getElementById("firstPageBtn");
    this.prevPageBtn = document.getElementById("prevPageBtn");
    this.nextPageBtn = document.getElementById("nextPageBtn");
    this.lastPageBtn = document.getElementById("lastPageBtn");
    // this.pageIndicator = document.getElementById("pageIndicator");
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
    if (this.isGatingOnlineQuote) return;

    this.setIsFetchingQuote("isGatingOnlineQuote", this.onlineQuoteBtn, true);

    const randomQuote = await QuoteProvider.getRandomQuoteViaAPI(
      QuoteProvider.onlineRandomQuoteUrl
    );
    this.setCurrentQuote(randomQuote);

    this.setIsFetchingQuote("isGatingOnlineQuote", this.onlineQuoteBtn, false);
  }

  setIsFetchingQuote(propertyName, button, isFetching) {
    this[propertyName] = isFetching;
    QuoteAppController.setButtonState(button, !isFetching);
  }

  async setServerRandomQuote() {
    if (this.isGatingServerQuote) return;

    this.setIsFetchingQuote("isGatingServerQuote", this.serverQuoteBtn, true);

    const randomQuote = await QuoteProvider.getRandomQuoteFromServer(
      QuoteProvider.serverRandomQuoteUrl
    );
    this.setCurrentQuote(randomQuote);

    this.setIsFetchingQuote("isGatingServerQuote", this.serverQuoteBtn, false);
  }

  setIsFetchingQuote(propertyName, button, isFetching) {
    this[propertyName] = isFetching;
    QuoteAppController.setButtonState(button, !isFetching);
  }

  static setButtonState(button, isEnabled) {
    button.disabled = !isEnabled;
  }

  init() {
    this.localQuoteBtn.addEventListener("click", () =>
      this.setLocalRandomQuote()
    );
    this.serverQuoteBtn.addEventListener("click", () =>
      this.setServerRandomQuote()
    );
    this.onlineQuoteBtn.addEventListener("click", () =>
      this.setOnlineRandomQuote()
    );

    this.removeAllFavoriteQuotesBtn.addEventListener("click", () =>
      favoriteQuotesController.removeAll(this.starElement)
    );

    this.starElement.addEventListener("click", () => {
      favoriteQuotesController.toggle(this.starElement);
    });

    this.firstPageBtn.addEventListener("click", () => {
      favoritesPaginator.goToFirstPage();
    });
    this.prevPageBtn.addEventListener("click", () => {
      favoritesPaginator.goToPrevPage();
    });
    this.nextPageBtn.addEventListener("click", () => {
      favoritesPaginator.goToNextPage();
    });
    this.lastPageBtn.addEventListener("click", () => {
      favoritesPaginator.goToLastPage();
    });
  }
}

const quoteAppController = new QuoteAppController();

export { quoteAppController };

// console.log(
//   "First",
//   quotes.filter((el) => isQuoteFavorite(el.id))
// );

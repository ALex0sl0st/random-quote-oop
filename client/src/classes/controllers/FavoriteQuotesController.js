import { appUI } from "../AppUI.js";
import { favoriteQuotes } from "../storage/FavoriteQuotes.js";
import currentQuoteManager from "../storage/CurrentQuoteManager.js";
import { favoritesPaginator } from "./FavoritesPaginator.js";

class FavoriteQuotesController {
  constructor(appUI, favoriteQuotes, currentQuoteManager, favoritesPaginator) {
    this.appUI = appUI;
    this.favoriteQuotes = favoriteQuotes;
    this.currentQuoteManager = currentQuoteManager;
    this.favoritesPaginator = favoritesPaginator;
  }

  updateViewAfterChange(quoteId) {
    this.favoritesPaginator.updateView(true);
    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(quoteId),
      quoteId
    );
  }

  add(quote) {
    this.favoriteQuotes.add(quote);

    this.updateViewAfterChange(quote.id);
  }

  remove(quote) {
    const quoteId = quote.id;

    this.favoriteQuotes.remove(quoteId);

    this.updateViewAfterChange(quoteId);
  }

  removeAll() {
    this.favoriteQuotes.removeAll();
    this.appUI.favoriteQuotesContainerElement.innerHTML = "";

    const currentQuoteId = this.currentQuoteManager.getCurrentQuoteId();
    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(currentQuoteId),
      currentQuoteId
    );

    this.favoritesPaginator.setCurrentPage(1);
  }

  toggle() {
    const currentQuote = this.currentQuoteManager.getCurrentQuote();
    if (currentQuote) {
      if (!this.favoriteQuotes.isQuoteFavorite(currentQuote.id)) {
        this.add(currentQuote);
      } else {
        this.remove(currentQuote);
      }
    }
  }
}

const favoriteQuotesController = new FavoriteQuotesController(
  appUI,
  favoriteQuotes,
  currentQuoteManager,
  favoritesPaginator
);

export { favoriteQuotesController };

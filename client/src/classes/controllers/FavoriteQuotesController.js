import { appUI } from "../AppUI.js";
import { favoriteQuotes } from "../storage/FavoriteQuotes.js";
import currentQuoteManager from "../storage/CurrentQuoteManager.js";

class FavoriteQuotesController {
  constructor(appUI, favoriteQuotes, currentQuoteManager) {
    this.appUI = appUI;
    this.favoriteQuotes = favoriteQuotes;
    this.currentQuoteManager = currentQuoteManager;
  }

  add(quote) {
    this.favoriteQuotes.add(quote);

    this.appUI.displayFavoriteQuote({ quote });
  }

  remove(quote) {
    const quoteId = quote.id;

    const cardElement = document.getElementById(`${quoteId}`);
    cardElement && cardElement.remove();

    this.favoriteQuotes.remove(quote.id);

    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(quoteId),
      quoteId
    );
  }

  toggle() {
    const currentQuote = this.currentQuoteManager.getCurrentQuote();
    if (currentQuote) {
      if (
        !this.favoriteQuotes.isQuoteFavorite(
          this.currentQuoteManager.getCurrentQuoteId()
        )
      ) {
        this.add(currentQuote);
      } else {
        this.remove(currentQuote);
      }
    }
  }

  removeAll() {
    this.favoriteQuotes.removeAll();
    this.appUI.favoriteQuotesContainerElement.innerHTML = "";

    const currentQuoteId = this.currentQuoteManager.getCurrentQuoteId();
    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(currentQuoteId),
      currentQuoteId
    );
  }
}

const favoriteQuotesController = new FavoriteQuotesController(
  appUI,
  favoriteQuotes,
  currentQuoteManager
);

export { favoriteQuotesController };

import { appUI } from "../AppUI.js";
import { favoriteQuotes } from "../storage/FavoriteQuotes.js";
import currentQuoteManager from "../storage/CurrentQuoteManager.js";

class FavoriteQuotesController {
  constructor(appUI, favoriteQuotes, currentQuoteManager) {
    this.appUI = appUI;
    this.favoriteQuotes = favoriteQuotes;
    this.currentQuoteManager = currentQuoteManager;
  }

  add(quote, starElement) {
    this.favoriteQuotes.add(quote);

    this.appUI.displayFavoriteQuote(quote, starElement, this.remove.bind(this));
  }

  remove(quote, starElement) {
    const quoteId = quote.id;

    const cardElement = document.getElementById(`${quoteId}`);
    cardElement && cardElement.remove();

    this.favoriteQuotes.remove(quote.id);

    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(quoteId),
      starElement,
      quoteId
    );
  }

  toggle(starElement) {
    const currentQuote = this.currentQuoteManager.getCurrentQuote();
    if (currentQuote) {
      if (
        !this.favoriteQuotes.isQuoteFavorite(
          this.currentQuoteManager.getCurrentQuoteId()
        )
      ) {
        this.add(currentQuote, starElement);
      } else {
        this.remove(currentQuote, starElement);
      }
    }
  }

  removeAll(starElement) {
    this.favoriteQuotes.removeAll();
    this.appUI.favoriteQuotesContainerElement.innerHTML = "";

    const currentQuoteId = this.currentQuoteManager.getCurrentQuoteId();
    this.appUI.updateStarView(
      this.favoriteQuotes.isQuoteFavorite(currentQuoteId),
      starElement,
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

import { favoriteQuotes } from "./classes/storage/FavoriteQuotes.js";
import { getQuoteIndexById } from "./utils/quoteHelpers.js";
import QuoteProvider from "./classes/QuoteProvider.js";
import currentQuoteManager from "./classes/storage/CurrentQuoteManager.js";
import { appUI } from "./classes/AppUI.js";
import { favoriteQuotesController } from "./classes/controllers/FavoriteQuotesController.js";

function initializeApp({ quotes, starElement }) {
  favoriteQuotes.loadFromLocalStorage();
  currentQuoteManager.loadFromLocalStorage();

  const currentQuote = currentQuoteManager.getCurrentQuote();
  const currentQuoteId = currentQuoteManager.getCurrentQuoteId();

  if (currentQuote) {
    appUI.displayCurrentQuote(currentQuote, starElement);

    QuoteProvider.setLastRandomIndex(getQuoteIndexById(quotes, currentQuoteId));
  }

  favoriteQuotes
    .getAll()
    .forEach((favoriteQuote) =>
      appUI.displayFavoriteQuote(
        favoriteQuote,
        starElement,
        favoriteQuotesController.remove.bind(favoriteQuotesController)
      )
    );
}

export { initializeApp };

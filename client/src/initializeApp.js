import { favoriteQuotes } from "./classes/storage/FavoriteQuotes.js";
import { getQuoteIndexById } from "./utils/quoteHelpers.js";
import QuoteProvider from "./classes/QuoteProvider.js";
import currentQuoteManager from "./classes/storage/CurrentQuoteManager.js";
import { appUI } from "./classes/AppUI.js";
import { favoriteQuotesController } from "./classes/controllers/FavoriteQuotesController.js";
import { quoteAppController } from "./classes/controllers/QuoteAppController.js";

function initializeApp(quotes) {
  favoriteQuotes.loadFromLocalStorage();
  currentQuoteManager.loadFromLocalStorage();

  const currentQuote = currentQuoteManager.getCurrentQuote();
  const currentQuoteId = currentQuoteManager.getCurrentQuoteId();

  appUI.setDefaults({
    starElement: quoteAppController.starElement,
    removeQuoteHandler: favoriteQuotesController.remove.bind(
      favoriteQuotesController
    ),
  });

  if (currentQuote) {
    appUI.displayCurrentQuote(currentQuote);

    QuoteProvider.setLastRandomIndex(getQuoteIndexById(quotes, currentQuoteId));
  }

  favoriteQuotes
    .getAll()
    .forEach((favoriteQuote) =>
      appUI.displayFavoriteQuote({ quote: favoriteQuote })
    );
}

export { initializeApp };

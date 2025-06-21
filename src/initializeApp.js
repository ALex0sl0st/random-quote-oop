import { favoriteQuotes } from "./classes/storage/FavoriteQuotes.js";
import { getQuoteIndexById } from "./utils/quoteHelpers.js";
import currentQuoteManager from "./classes/storage/CurrentQuoteManager.js";
import { appUI } from "./classes/AppUI.js";
import { removeQuoteFromFavorites } from "./handlers/favoritesHandler.js";

function initializeApp({ quotes, starElement }) {
  let currentQuoteIndex = -1;
  let currentQuoteId = null;

  favoriteQuotes.loadFromLocalStorage();
  currentQuoteManager.loadFromLocalStorage();

  const currentQuote = currentQuoteManager.getCurrentQuote();

  if (currentQuote) {
    currentQuoteId = currentQuote.id;
    appUI.displayCurrentQuote(currentQuote, starElement);

    currentQuoteIndex = getQuoteIndexById(quotes, currentQuoteId);
  }

  favoriteQuotes
    .getAll()
    .forEach((favoriteQuote) =>
      appUI.displayFavoriteQuote(
        favoriteQuote,
        starElement,
        removeQuoteFromFavorites
      )
    );

  return currentQuoteIndex;
}

export { initializeApp };

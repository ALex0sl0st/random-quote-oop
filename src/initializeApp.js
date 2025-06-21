import { favorites } from "./classes/FavoriteQuotes.js";
import {
  loadFromLocalStorage,
  LOCAL_STORAGE_KEYS,
} from "./utils/localStorageUtils.js";
import { getQuoteIndexById } from "./managers/quoteManager.js";
import { displayCurrentQuote, displayFavoriteQuote } from "./uiHelpers.js";
import { removeQuoteFromFavorites } from "./handlers/favoritesHandler.js";

function initializeApp({ quotes, starElement }) {
  let currentQuoteIndex = -1;
  let currentQuoteId = null;

  favorites.loadFromLocalStorage();

  const currentQuoteFromLocalStorage = loadFromLocalStorage(
    LOCAL_STORAGE_KEYS.CURRENT_QUOTE
  );

  if (currentQuoteFromLocalStorage) {
    currentQuoteId = currentQuoteFromLocalStorage.id;
    displayCurrentQuote(currentQuoteFromLocalStorage, starElement);
  }

  if (currentQuoteId) {
    currentQuoteIndex = getQuoteIndexById(quotes, currentQuoteId);
  }

  favorites
    .getAll()
    .forEach((favoriteQuote) =>
      displayFavoriteQuote(favoriteQuote, starElement, removeQuoteFromFavorites)
    );

  return {
    currentQuoteIndex,
    currentQuoteId,
  };
}

export { initializeApp };

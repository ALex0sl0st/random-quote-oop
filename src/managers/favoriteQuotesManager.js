import {
  LOCAL_STORAGE_KEYS,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils.js";

let favoriteQuotes = [];

function storeFavoriteQuote(quote) {
  if (!favoriteQuotes.some((el) => el.id === quote.id)) {
    favoriteQuotes.push(quote);
    saveToLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_QUOTES, favoriteQuotes);
  }
}

function unstoreFavoriteQuote(id) {
  favoriteQuotes = favoriteQuotes.filter((quote) => quote.id !== id);
  saveToLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_QUOTES, favoriteQuotes);
}

function getFavoriteQuotes() {
  return favoriteQuotes;
}

function isQuoteFavorite(id) {
  return favoriteQuotes.some((quote) => quote.id === id);
}

function loadFavoriteQuotesFromLocalStorage() {
  favoriteQuotes =
    loadFromLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_QUOTES) || [];
}

export {
  storeFavoriteQuote,
  unstoreFavoriteQuote,
  getFavoriteQuotes,
  isQuoteFavorite,
  loadFavoriteQuotesFromLocalStorage,
};

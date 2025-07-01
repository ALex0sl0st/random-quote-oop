const LOCAL_STORAGE_KEYS = {
  QUOTES: "quotes",
  CURRENT_QUOTE: "currentQuote",
  FAVORITE_QUOTES: "favoriteQuotes",
  FAVORITE_QUOTES_PAGE_NUMBER: "favoriteQuotesPageNumber",
};

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export { saveToLocalStorage, loadFromLocalStorage, LOCAL_STORAGE_KEYS };

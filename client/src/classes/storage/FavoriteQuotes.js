import {
  LOCAL_STORAGE_KEYS,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorageUtils.js";
import { Quote } from "../Quote.js";
class FavoriteQuotes {
  constructor(storageKey = LOCAL_STORAGE_KEYS.FAVORITE_QUOTES) {
    this.storageKey = storageKey;
    this.favoriteQuotes = [];
  }

  add(quote) {
    if (!this.favoriteQuotes.some((el) => el.id === quote.id)) {
      this.favoriteQuotes.push(quote);
      saveToLocalStorage(this.storageKey, this.favoriteQuotes);
    }
  }

  remove(id) {
    this.favoriteQuotes = this.favoriteQuotes.filter(
      (quote) => quote.id !== id
    );
    saveToLocalStorage(this.storageKey, this.favoriteQuotes);
  }

  getAll(reverse = false) {
    return !reverse
      ? this.favoriteQuotes
      : this.favoriteQuotes.slice().reverse();
  }

  removeAll() {
    this.favoriteQuotes = [];
    saveToLocalStorage(this.storageKey, this.favoriteQuotes);
  }

  isQuoteFavorite(id) {
    return this.favoriteQuotes.some((quote) => quote.id === id);
  }

  loadFromLocalStorage() {
    const stored = loadFromLocalStorage(this.storageKey) || [];

    this.favoriteQuotes = stored.map((obj) => Quote.createFromObject(obj));
  }
}

const favoriteQuotes = new FavoriteQuotes();

export { favoriteQuotes };

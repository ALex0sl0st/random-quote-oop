import { updateStarView, displayFavoriteQuote } from "../uiHelpers.js";
import { getQuoteById, getCurrentQuoteId } from "../managers/quoteManager.js";
import { favorites } from "../classes/FavoriteQuotes.js";

function addQuoteToFavorites(quote, starElement) {
  favorites.add(quote);

  displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites);
}

function removeQuoteFromFavorites(quote, starElement) {
  const quoteId = quote.id;

  const cardElement = document.getElementById(`${quoteId}`);
  cardElement && cardElement.remove();

  favorites.remove(quote.id);

  updateStarView(favorites.isQuoteFavorite(quoteId), starElement, quoteId);
}

function toggleFavoriteQuote(quotes, starElement) {
  const currentQuoteId = getCurrentQuoteId();
  if (currentQuoteId && currentQuoteId !== "null") {
    const currentQuote = getQuoteById(quotes, currentQuoteId);
    if (!favorites.isQuoteFavorite(currentQuoteId)) {
      addQuoteToFavorites(currentQuote, starElement);
    } else {
      removeQuoteFromFavorites(currentQuote, starElement);
    }
  }
}

export { addQuoteToFavorites, removeQuoteFromFavorites, toggleFavoriteQuote };

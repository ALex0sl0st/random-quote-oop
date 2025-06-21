import { updateStarView, displayFavoriteQuote } from "../uiHelpers.js";
import { getQuoteById, getCurrentQuoteId } from "../managers/quoteManager.js";
import {
  storeFavoriteQuote,
  unstoreFavoriteQuote,
  isQuoteFavorite,
} from "../managers/favoriteQuotesManager.js";

function addQuoteToFavorites(quote, starElement) {
  storeFavoriteQuote(quote);

  displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites);
}

function removeQuoteFromFavorites(quote, starElement) {
  const quoteId = quote.id;

  const cardElement = document.getElementById(`${quoteId}`);
  cardElement && cardElement.remove();

  unstoreFavoriteQuote(quote.id);

  updateStarView(isQuoteFavorite(quoteId), starElement, quoteId);
}

function toggleFavoriteQuote(quotes, starElement) {
  const currentQuoteId = getCurrentQuoteId();
  if (currentQuoteId && currentQuoteId !== "null") {
    const currentQuote = getQuoteById(quotes, currentQuoteId);
    if (!isQuoteFavorite(currentQuoteId)) {
      addQuoteToFavorites(currentQuote, starElement);
    } else {
      removeQuoteFromFavorites(currentQuote, starElement);
    }
  }
}

export { addQuoteToFavorites, removeQuoteFromFavorites, toggleFavoriteQuote };

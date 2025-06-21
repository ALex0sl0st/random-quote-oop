import { appUI } from "../classes/AppUI.js";
import { favoriteQuotes } from "../classes/storage/FavoriteQuotes.js";
import currentQuoteManager from "../classes/storage/CurrentQuoteManager.js";

function addQuoteToFavorites(quote, starElement) {
  favoriteQuotes.add(quote);

  appUI.displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites);
}

function removeQuoteFromFavorites(quote, starElement) {
  const quoteId = quote.id;

  const cardElement = document.getElementById(`${quoteId}`);
  cardElement && cardElement.remove();

  favoriteQuotes.remove(quote.id);

  appUI.updateStarView(
    favoriteQuotes.isQuoteFavorite(quoteId),
    starElement,
    quoteId
  );
}

function toggleFavoriteQuote(starElement) {
  const currentQuote = currentQuoteManager.getCurrentQuote();
  if (currentQuote) {
    if (
      !favoriteQuotes.isQuoteFavorite(currentQuoteManager.getCurrentQuoteId())
    ) {
      addQuoteToFavorites(currentQuote, starElement);
    } else {
      removeQuoteFromFavorites(currentQuote, starElement);
    }
  }
}

export { addQuoteToFavorites, removeQuoteFromFavorites, toggleFavoriteQuote };

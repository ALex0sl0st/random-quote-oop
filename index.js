import quotes from "./src/data/quotes.js";
import QuoteProvider from "./src/classes/QuoteProvider.js";
import { toggleFavoriteQuote } from "./src/handlers/favoritesHandler.js";
import currentQuoteManager from "./src/classes/storage/CurrentQuoteManager.js";
import { appUI } from "./src/classes/AppUI.js";
import { initializeApp } from "./src/initializeApp.js";

const nextQuoteBtn = document.getElementById("next-quote-btn");
const starElement = document.getElementById("star");

initializeApp({ quotes, starElement });

function setRandomQuote() {
  const randomQuote = QuoteProvider.getRandomQuoteFromArray(quotes);

  currentQuoteManager.update(randomQuote);
  appUI.displayCurrentQuote(currentQuoteManager.getCurrentQuote(), starElement);
  // console.log(
  //   "First",
  //   quotes.filter((el) => isQuoteFavorite(el.id))
  // );
}

nextQuoteBtn.addEventListener("click", setRandomQuote);
starElement.addEventListener("click", () => {
  toggleFavoriteQuote(starElement);
});

// function getCurrentQuoteId() {
//   return currentQuoteId;
// }

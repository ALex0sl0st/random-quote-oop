import quotes from "./src/data/quotes.js";
import QuoteProvider from "./src/classes/QuoteProvider.js";
import { toggleFavoriteQuote } from "./src/handlers/favoritesHandler.js";
import currentQuoteManager from "./src/classes/storage/CurrentQuoteManager.js";
import { appUI } from "./src/classes/AppUI.js";
import { initializeApp } from "./src/initializeApp.js";

const localQuoteBtn = document.getElementById("local-quote-btn");
const onlineQuoteBtn = document.getElementById("online-quote-btn");
const starElement = document.getElementById("star");

initializeApp({ quotes, starElement });

function setCurrentQuote(quote) {
  currentQuoteManager.update(quote);
  appUI.displayCurrentQuote(currentQuoteManager.getCurrentQuote(), starElement);
}

function setLocalRandomQuote() {
  const randomQuote = QuoteProvider.getRandomQuoteFromArray(quotes);
  // console.log("local");

  setCurrentQuote(randomQuote);
}

async function setOnlineRandomQuote() {
  const randomQuote = await QuoteProvider.getRandomQuoteViaAPI();
  // console.log("api");

  if (randomQuote) setCurrentQuote(randomQuote);
}

localQuoteBtn.addEventListener("click", setLocalRandomQuote);
onlineQuoteBtn.addEventListener("click", setOnlineRandomQuote);
starElement.addEventListener("click", () => {
  toggleFavoriteQuote(starElement);
});

// console.log(
//   "First",
//   quotes.filter((el) => isQuoteFavorite(el.id))
// );

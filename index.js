import quotes from "./src/data/quotes.js";
import { toggleFavoriteQuote } from "./src/handlers/favoritesHandler.js";
import { getRandomQuoteIndex } from "./src/utils/mathUtils.js";
import {
  saveToLocalStorage,
  LOCAL_STORAGE_KEYS,
} from "./src/utils/localStorageUtils.js";
import { displayCurrentQuote } from "./src/uiHelpers.js";
import { initializeApp } from "./src/initializeApp.js";

const nextQuoteBtn = document.getElementById("next-quote-btn");
const starElement = document.getElementById("star");

// let currentQuoteIndex = -1;
// let currentQuoteId = null;

let { currentQuoteIndex, currentQuoteId } = initializeApp({
  quotes,
  starElement,
});

function setRandomQuote() {
  const randomIndex = getRandomQuoteIndex(currentQuoteIndex, quotes.length);
  currentQuoteIndex = randomIndex;

  const randomQuote = quotes[randomIndex];
  currentQuoteId = randomQuote.id;

  currentQuoteId = randomQuote.id;
  displayCurrentQuote(randomQuote, starElement);

  saveToLocalStorage(LOCAL_STORAGE_KEYS.CURRENT_QUOTE, randomQuote);
  // console.log(
  //   "First",
  //   quotes.filter((el) => isQuoteFavorite(el.id))
  // );
}

nextQuoteBtn.addEventListener("click", setRandomQuote);
starElement.addEventListener("click", () => {
  toggleFavoriteQuote(quotes, starElement);
});

// function getCurrentQuoteId() {
//   return currentQuoteId;
// }

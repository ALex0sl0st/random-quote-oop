import { getCurrentQuoteId } from "./managers/quoteManager.js";
import { isQuoteFavorite } from "./managers/favoriteQuotesManager.js";

const favoriteQuotesContainerElement = document.getElementById(
  "favoriteQuotesContainer"
);

const quoteElement = document.getElementById("quote");
const quoteAuthorElement = document.getElementById("quote-author");
const currentQuoteContainerElement = document.getElementById(
  "current-quote-container"
);

function setStarView(isFavorite, element) {
  if (isFavorite) {
    element.classList.add("active-star");
    element.classList.remove("inactive-star");
  } else {
    element.classList.add("inactive-star");
    element.classList.remove("active-star");
  }
}

function updateStarView(isFavorite, element, updatingQuoteId) {
  if (updatingQuoteId === getCurrentQuoteId()) {
    setStarView(isFavorite, element);
  }
}

function displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites) {
  const { text, author, id } = quote;

  const isFavorite = isQuoteFavorite(id);

  const favoriteQuoteCard = document.createElement("div");
  const quoteAuthor = author ? author : "No author";

  favoriteQuoteCard.innerHTML = `
  <h2>${quoteAuthor} -</h2>
  <p>"${text}"</p>
  <button class="delete-quote-btn">Remove</button>`;

  favoriteQuoteCard.classList.add("quoteCard");
  favoriteQuoteCard.id = `${id}`;

  favoriteQuotesContainerElement.prepend(favoriteQuoteCard);
  updateStarView(isFavorite, starElement, id);

  document
    .getElementById(id)
    .querySelector(`.delete-quote-btn`)
    .addEventListener("click", () => {
      removeQuoteFromFavorites(quote, starElement, id);
    });
}

function displayCurrentQuote(quote, starElement) {
  const { id, text, author } = quote;
  quoteElement.textContent = `"${text}"`;
  quoteAuthorElement.textContent = author
    ? author
    : "This quote does not have author";

  currentQuoteContainerElement.dataset.currentQuoteId = id;

  setStarView(isQuoteFavorite(id), starElement);
}

export {
  setStarView,
  updateStarView,
  displayFavoriteQuote,
  displayCurrentQuote,
};

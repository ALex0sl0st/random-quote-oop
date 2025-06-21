import { getCurrentQuoteId } from "../managers/quoteManager.js";
import { favorites } from "./FavoriteQuotes.js";

class AppUI {
  constructor() {
    this.favoriteQuotesContainerElement = document.getElementById(
      "favoriteQuotesContainer"
    );

    this.quoteElement = document.getElementById("quote");
    this.quoteAuthorElement = document.getElementById("quote-author");
    this.currentQuoteContainerElement = document.getElementById(
      "current-quote-container"
    );
  }

  setStarView(isFavorite, element) {
    if (isFavorite) {
      element.classList.add("active-star");
      element.classList.remove("inactive-star");
    } else {
      element.classList.add("inactive-star");
      element.classList.remove("active-star");
    }
  }

  updateStarView(isFavorite, element, updatingQuoteId) {
    if (updatingQuoteId === getCurrentQuoteId()) {
      this.setStarView(isFavorite, element);
    }
  }

  displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites) {
    const { text, author, id } = quote;

    const isFavorite = favorites.isQuoteFavorite(id);

    const favoriteQuoteCard = document.createElement("div");
    const quoteAuthor = author ? author : "No author";

    favoriteQuoteCard.innerHTML = `
  <h2>${quoteAuthor} -</h2>
  <p>"${text}"</p>
  <button class="delete-quote-btn">Remove</button>`;

    favoriteQuoteCard.classList.add("quoteCard");
    favoriteQuoteCard.id = `${id}`;

    this.favoriteQuotesContainerElement.prepend(favoriteQuoteCard);
    this.updateStarView(isFavorite, starElement, id);

    document
      .getElementById(id)
      .querySelector(`.delete-quote-btn`)
      .addEventListener("click", () => {
        removeQuoteFromFavorites(quote, starElement, id);
      });
  }

  displayCurrentQuote(quote, starElement) {
    const { id, text, author } = quote;
    this.quoteElement.textContent = `"${text}"`;
    this.quoteAuthorElement.textContent = author
      ? author
      : "This quote does not have author";

    this.currentQuoteContainerElement.dataset.currentQuoteId = id;

    this.setStarView(favorites.isQuoteFavorite(id), starElement);
  }
}

const appUI = new AppUI();
export { appUI };

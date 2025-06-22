import { favoriteQuotes } from "./storage/FavoriteQuotes.js";
import currentQuoteManager from "./storage/CurrentQuoteManager.js";

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
    if (updatingQuoteId === currentQuoteManager.getCurrentQuoteId()) {
      this.setStarView(isFavorite, element);
    }
  }

  displayFavoriteQuote(quote, starElement, removeQuoteFromFavorites) {
    const { id } = quote;

    const isFavorite = favoriteQuotes.isQuoteFavorite(id);

    const favoriteQuoteCard = document.createElement("div");

    favoriteQuoteCard.innerHTML = `
  <h2>${quote.formatAuthor()} -</h2>
  <p>${quote.formatText()}</p>
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
    const { id } = quote;
    this.quoteElement.textContent = quote.formatText();
    this.quoteAuthorElement.textContent = quote.formatAuthor();

    // this.currentQuoteContainerElement.dataset.currentQuoteId = id;

    this.setStarView(favoriteQuotes.isQuoteFavorite(id), starElement);
  }
}

const appUI = new AppUI();
export { appUI };

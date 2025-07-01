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

    this.pageIndicatorElement = document.getElementById("pageIndicator");

    this.starElement = null;
    this.removeQuoteHandler = null;
  }

  setDefaults({ starElement, removeQuoteHandler }) {
    this.starElement = starElement;
    this.removeQuoteHandler = removeQuoteHandler;
  }

  setStarView(isFavorite, element = this.starElement) {
    if (isFavorite) {
      element.classList.add("active-star");
      element.classList.remove("inactive-star");
    } else {
      element.classList.add("inactive-star");
      element.classList.remove("active-star");
    }
  }

  updateStarView(isFavorite, updatingQuoteId, element = this.starElement) {
    if (updatingQuoteId === currentQuoteManager.getCurrentQuoteId()) {
      this.setStarView(isFavorite, element);
    }
  }

  displayCurrentQuote(quote, starElement = this.starElement) {
    const { id } = quote;
    this.quoteElement.textContent = quote.formatText();
    this.quoteAuthorElement.textContent = quote.formatAuthor();

    // this.currentQuoteContainerElement.dataset.currentQuoteId = id;

    this.setStarView(favoriteQuotes.isQuoteFavorite(id), starElement);
  }

  displayFavoriteQuote({
    quote,
    starElement = this.starElement,
    removeQuoteFromFavorites = this.removeQuoteHandler,
    updateStarView = true,
  }) {
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

    if (updateStarView) {
      this.updateStarView(isFavorite, id);
    }

    document
      .getElementById(id)
      .querySelector(`.delete-quote-btn`)
      .addEventListener("click", () => {
        removeQuoteFromFavorites(quote, starElement, id);
      });
  }

  updateFavoriteQuotesPage(quotesOnPage, pageNumber) {
    this.favoriteQuotesContainerElement.innerHTML = "";

    quotesOnPage.forEach((quote) =>
      this.displayFavoriteQuote({ quote, updateStarView: false })
    );

    this.updatePageIndicator(pageNumber);
  }

  updatePageIndicator(pageNumber = 1) {
    this.pageIndicatorElement.textContent = `Page ${pageNumber}`;
  }
}

const appUI = new AppUI();
export { appUI };

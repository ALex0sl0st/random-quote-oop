import { favoriteQuotes } from "../storage/FavoriteQuotes.js";
import { appUI } from "../AppUI.js";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  LOCAL_STORAGE_KEYS,
} from "../../utils/localStorageUtils.js";

class FavoritesPaginator {
  constructor() {
    this.currentPage = 1;
    this.maxItemsPerPage = 2;
  }

  getMaxPageNumber() {
    const maxPageNumber = Math.ceil(
      favoriteQuotes.getAll().length / this.maxItemsPerPage
    );

    return maxPageNumber >= 1 ? maxPageNumber : 1;
  }

  getNormalizedPageNumber(pageNumber) {
    const maxPageNumber = this.getMaxPageNumber();
    return pageNumber <= maxPageNumber ? pageNumber : maxPageNumber;
  }

  setCurrentPageNumber(pageNumber) {
    this.currentPage = pageNumber;
    saveToLocalStorage(
      LOCAL_STORAGE_KEYS.FAVORITE_QUOTES_PAGE_NUMBER,
      this.currentPage
    );
  }

  goToFirstPage() {
    this.setCurrentPageNumber(1);
    this.updateView();
  }

  goToLastPage() {
    this.setCurrentPageNumber(this.getMaxPageNumber());
    this.updateView();
  }

  goToNextPage() {
    if (this.currentPage < this.getMaxPageNumber()) {
      this.setCurrentPageNumber(this.currentPage + 1);
    }
    this.updateView();
  }

  goToPrevPage() {
    if (this.currentPage > 1) {
      this.setCurrentPageNumber(this.currentPage - 1);
    }
    this.updateView();
  }

  updateView(normalizePageNumber = false) {
    if (normalizePageNumber) {
      this.setCurrentPageNumber(this.getNormalizedPageNumber(this.currentPage));
    }

    appUI.updateFavoriteQuotesPage(
      this.getQuotesForPage(this.currentPage),
      this.currentPage,
      this.getMaxPageNumber()
    );
  }

  setCurrentPage(pageNumber) {
    this.setCurrentPageNumber(pageNumber);
    this.updateView();
  }

  getQuotesForPage(pageNumber = this.currentPage) {
    pageNumber = this.getNormalizedPageNumber(pageNumber);

    const allQuotes = favoriteQuotes.getAll(true);
    const startIndex = (pageNumber - 1) * this.maxItemsPerPage;
    const endIndex = startIndex + this.maxItemsPerPage;

    return allQuotes.slice(startIndex, endIndex);
  }

  loadFromLocalStorage() {
    this.currentPage =
      loadFromLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE_QUOTES_PAGE_NUMBER) || 1;
  }
}

const favoritesPaginator = new FavoritesPaginator();

export { favoritesPaginator };

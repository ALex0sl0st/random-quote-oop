import { favoriteQuotes } from "../storage/FavoriteQuotes.js";
import { appUI } from "../AppUI.js";

class FavoritesPaginator {
  constructor() {
    this.currentPage = 1;
    this.maxItemsPerPage = 1;
  }

  getMaxPageNumber() {
    return Math.ceil(favoriteQuotes.getAll().length / this.maxItemsPerPage);
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.updateView();
  }

  goToLastPage() {
    this.currentPage = this.getMaxPageNumber();
    this.updateView();
  }

  goToNextPage() {
    if (this.currentPage < this.getMaxPageNumber()) this.currentPage++;
    this.updateView();
  }

  goToPrevPage() {
    if (this.currentPage > 1) this.currentPage--;
    this.updateView();
  }

  updateView() {
    appUI.updatePageIndicator(this.currentPage);
    console.log(this.getQuotesForPage());
  }

  getQuotesForPage(pageNumber = this.currentPage) {
    const maxPageNumber = this.getMaxPageNumber();
    pageNumber = pageNumber <= maxPageNumber ? pageNumber : maxPageNumber;

    const allQuotes = favoriteQuotes.getAll(true);
    const startIndex = (pageNumber - 1) * this.maxItemsPerPage;
    const endIndex = startIndex + this.maxItemsPerPage;

    return allQuotes.slice(startIndex, endIndex);
  }

  setCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
    appUI.updatePageIndicator(this.currentPage);
  }
}

const favoritesPaginator = new FavoritesPaginator();

export { favoritesPaginator };

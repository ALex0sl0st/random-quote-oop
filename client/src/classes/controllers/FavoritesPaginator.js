import { favoriteQuotes } from "../storage/FavoriteQuotes.js";

class FavoritesPaginator {
  constructor() {
    this.currentPage = 1;
    this.maxItemsPerPage = 1;
  }

  goToFirstPage() {
    this.currentPage = 1;
    console.log(this.currentPage);
  }

  goToLastPage() {
    this.currentPage = Math.ceil(
      favoriteQuotes.getAll().length / this.maxItemsPerPage
    );
    console.log(this.currentPage);
  }

  goToNextPage() {
    const max = Math.ceil(
      favoriteQuotes.getAll().length / this.maxItemsPerPage
    );
    if (this.currentPage < max) this.currentPage++;
    console.log(this.currentPage);
  }

  goToPrevPage() {
    if (this.currentPage > 1) this.currentPage--;
    console.log(this.currentPage);
  }
}

const favoritesPaginator = new FavoritesPaginator();

export { favoritesPaginator };

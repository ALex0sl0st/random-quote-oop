const getQuoteById = (quotes, id) => {
  return quotes.find((el) => el["id"] === id);
};

const getCurrentQuoteId = () => {
  return document.getElementById("current-quote-container").dataset
    .currentQuoteId;
};

const getQuoteIndexById = (quotes, id) => {
  return id ? quotes.findIndex((el) => el.id === id) : -1;
};

export { getQuoteById, getCurrentQuoteId, getQuoteIndexById };

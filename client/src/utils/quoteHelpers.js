function getQuoteById(quotes, id) {
  return quotes.find((el) => el.id === id);
}

function getQuoteIndexById(quotes, id) {
  return id ? quotes.findIndex((el) => el.id === id) : -1;
}

export { getQuoteById, getQuoteIndexById };

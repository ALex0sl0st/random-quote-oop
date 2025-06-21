function getRandomQuoteIndex(currentQuoteIndex, quoteLength) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quoteLength);
  } while (randomIndex === currentQuoteIndex && quoteLength > 1);

  return randomIndex;
}

export { getRandomQuoteIndex };

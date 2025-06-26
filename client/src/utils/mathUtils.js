function getRandomIndex(length, excludedIndex = -1) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * length);
  } while (randomIndex === excludedIndex && length > 1);

  return randomIndex;
}

export { getRandomIndex };

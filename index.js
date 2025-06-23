import { initializeApp } from "./src/initializeApp.js";
import quotes from "./src/data/quotes.js";
import { quoteAppController } from "./src/classes/QuoteAppController.js";

initializeApp({ quotes, starElement: quoteAppController.starElement });
quoteAppController.init();

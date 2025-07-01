import { initializeApp } from "./src/initializeApp.js";
import quotes from "./src/data/quotes.js";
import { quoteAppController } from "./src/classes/controllers/QuoteAppController.js";

initializeApp(quotes);
quoteAppController.init();

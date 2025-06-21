import { getUniqueId } from "../utils/helpers.js";
class Quote {
  constructor(text, author, id = null) {
    this.text = text;
    this.author = author;
    this.id = id ? id : getUniqueId();
  }

  static createFromObject(obj) {
    return new Quote(obj.text, obj.author, obj.id);
  }
}
export { Quote };

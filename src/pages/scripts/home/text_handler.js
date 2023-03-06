export class TextHandler {
  constructor(text) {
    this.text = text;
    this.wordList = [];
  }

  #sanitize() {
    this.text = this.text
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase();

    return this;
  }

  #serialize() {
    this.wordList = this.text.split(" ");

    return this;
  }

  getText() {
    const builder = this
      .#sanitize();

    return builder.text;
  }

  getWordList() {
    const builder = this
      .#sanitize()
      .#serialize();

    return builder.wordList;
  }
}
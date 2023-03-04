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

export class ElementHandler {
  constructor(querySelector) {
    this.element = document.querySelector(querySelector);
    this.element.innerHTML = "";
  }
  
  #createSpan(text, className) {
    const span = document.createElement("span");

    span.classList.add(className);
    span.innerText = text + " ";

    return span;
  }

  #appendSpan(span) {
    this.element.appendChild(span);
  }

  createSpanList(list, className) {
    console.log(list)

    return list.map((text) => this.#createSpan(text, className));
  }

  appendSpanList(spanList) {
    spanList.forEach((span) => this.#appendSpan(span));
  }
}
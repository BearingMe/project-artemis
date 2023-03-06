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
    return list.map((text) => this.#createSpan(text, className));
  }

  appendSpanList(spanList) {
    spanList.forEach((span) => this.#appendSpan(span));
  }
}

export class CursorHandler {
  constructor(textWrapper) {
    this.textWrapper = textWrapper;

    this.currentLetterIndex = 0;
    this.currentWordIndex = 0;

    this.currentCursorPosition = textWrapper.children[0].children[0];
  }

  #checkDOMState() {
    const currentWord = this.textWrapper.children[this.currentWordIndex];
    const currentLetter = currentWord.children[this.currentLetterIndex];

    return {
      currentWord,
      currentLetter
    }
  }

  #checkState() {
    const { currentWord } = this.#checkDOMState();

    const isFirstLetter = (this.currentLetterIndex === 0);
    const isLastLetter = (this.currentLetterIndex === currentWord.children.length - 1);

    const isFirstWord = (this.currentWordIndex === 0);
    const isLastWord = (this.currentWordIndex === this.textWrapper.children.length - 1);

    const isStartOfText = (isFirstLetter && isFirstWord);
    const isEndOfText = (isLastLetter && isLastWord);

    return {
      isFirstLetter,
      isLastLetter,
      isFirstWord,
      isLastWord,
      isStartOfText,
      isEndOfText
    }
  }

  #goToPreviousLetter() {
    this.currentLetterIndex -= 1;
  }

  #goToNextLetter() {
    this.currentLetterIndex += 1;
  }

  #goToPreviousWord() {
    this.currentWordIndex -= 1;
    this.currentLetterIndex = this.textWrapper.children[this.currentWordIndex].children.length - 1;
  }

  #goToNextWord() {
    this.currentWordIndex += 1;
    this.currentLetterIndex = 0;
  }

  #activateCursor(state) {
    const element = this.textWrapper
      .children[this.currentWordIndex]
      .children[this.currentLetterIndex]

    const addCursor = () => element.classList.add("cursor");
    const removeCursor = () => element.classList.remove("cursor");

    state
      ? addCursor()
      : removeCursor();

    this.currentCursorPosition = element;
  }

  prev() {
    const { isStartOfText, isFirstLetter } = this.#checkState();

    if (isStartOfText) return;

    this.#activateCursor(false);

    isFirstLetter
      ? this.#goToPreviousWord()
      : this.#goToPreviousLetter();

    this.#activateCursor(true);
  }

  next() {
    const { isEndOfText, isLastLetter } = this.#checkState();

    if (isEndOfText) return;

    this.#activateCursor(false);

    isLastLetter
      ? this.#goToNextWord()
      : this.#goToNextLetter();

    this.#activateCursor(true);
  }
}

export class InputHandler {
  constructor(cursorHandler) {
    this.cursorHandler = cursorHandler;
  }

  get currentPos() {
    return this.cursorHandler.currentCursorPosition;
  }

  get currentLetter() {
    return this.cursorHandler.currentCursorPosition.innerText;
  }

  letter(key) {
    console.log(key, this.currentLetter);

    this.currentPos.className = (key === this.currentLetter)
      ? "letter correct"
      : "letter incorrect";

    this.cursorHandler.next();
  }

  space() {
    this.currentLetter === " "
      ? this.currentPos.className = "letter correct"
      : this.currentPos.className = "letter incorrect";

    this.cursorHandler.next();
  }

  backspace() {
    this.cursorHandler.prev();

    document.querySelector(".cursor").className = "letter cursor";
  }
}

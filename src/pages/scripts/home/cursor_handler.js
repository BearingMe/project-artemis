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
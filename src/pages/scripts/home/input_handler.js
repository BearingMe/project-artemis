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
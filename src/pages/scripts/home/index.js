import { TextHandler } from "./text_handler.js"
import { ElementHandler } from "./element_handler.js"
import { CursorHandler } from "./cursor_handler.js"
import { InputHandler } from "./input_handler.js"

import { loadTextIntoDOM } from "./dom_loader.js"

function loadSourceText() {
  const sourceText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ipsum ex eveniet qui quisquam consequatur, culpa placeat veniam quis, quidem enim. Harum enim dolorum libero vel nemo ratione minus accusantium?";

  const textHandler = new TextHandler(sourceText);
  const elementHandler = new ElementHandler("#typing-test");

  const wordList = textHandler.getWordList();
  const spanList = elementHandler.createSpanList(wordList, "word");

  elementHandler.appendSpanList(spanList);

  // gambiarra malaca pra testar o código
  const wordSpanList = document.querySelectorAll(".word");

  wordSpanList.forEach((wordSpan) => {
    const text = wordSpan.innerText;
    const textList = text.split("");

    const spanList = textList.map((letter) => {
      const span = document.createElement("span");

      span.innerText = letter;
      span.classList.add("letter");

      return span;
    });

    wordSpan.innerHTML = "";
    spanList.forEach((span) => wordSpan.appendChild(span));
  });
  // fim da gambiarra

  document.
    querySelector("#typing-test").
    querySelector(".word").
    querySelector(".letter").
    classList.add("cursor");
}

export function main() {
  loadSourceText();
  loadTextIntoDOM();

  const textWrapper = document.querySelector("#typing-test");

  const cursorHandler = new CursorHandler(textWrapper);
  const inputHandler = new InputHandler(cursorHandler);

  addEventListener("keydown", (event) => {
    const { key } = event;

    if (key.match(/^[a-zA-Z]$/)) {
      inputHandler.letter(key);
    }

    if (key === "Backspace") {
      inputHandler.backspace();
    }

    if (key === " ") {
      inputHandler.space();
    }
  });
}
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
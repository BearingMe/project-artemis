export function loadTextIntoDOM() {
  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ipsum ex eveniet qui quisquam consequatur, culpa placeat veniam quis, quidem enim. Harum enim dolorum libero vel nemo ratione minus accusantium?"

  const repository = new Repository();
  const presenter = new Presenter();
  
  repository.text = text;

  const useCase = new UseCase(presenter, repository);

  useCase.loadText();
}

// domain layer (entity)
class Entity {
  #text;

  constructor(text) {
    this.#text = text;
  }

  get raw() {
    const builder = this
      .#sanitize();

    return builder.#text;
  }

  get data() {
    const builder = this
      .#sanitize()
      .#normalize();

    return builder.#text;
  }

  #sanitize() {
    this.#text = this.#text
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase();

    return this;
  }

  #normalize() {
    this.#text = this.#text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return this;
  }
}

// application layer (use case)
class UseCase {
  #presenter;
  #repository;

  constructor(presenter, repository) {
    this.#presenter = presenter;
    this.#repository = repository;
  }

  loadText() {
    const text = this.#repository.text;
    const entity = new Entity(text);

    this.#presenter.loadView(entity.data);
  } 
}

// presentation layer (controller)
class Presenter {
  #createGenericNode(tagName, className, dataValue) {
    const node = document.createElement(tagName);

    className && node
      .classList
      .add(className)

    dataValue && node
      .setAttribute(`data-${className}`, dataValue);

    return node;
  }
  
  #attachNodeList(parentNode, nodeList) {
    nodeList.forEach((node) => parentNode.appendChild(node));
  }

  #createNodeFromLetter(letter) {
    const node = this.#createGenericNode("span", "letter", letter);

    node.innerText = letter;

    return node;
  }

  #createNodeFromLetterList(letterList) {
    return letterList
      .map((letter) => this.#createNodeFromLetter(letter));
  }

  #createNodeFromWord(word, rawWord) {
    const node = this.#createGenericNode("span", "word", rawWord || word);
    
    const text = `${word} `;
    const letterList = text.split("");
    const letterNodeList = this.#createNodeFromLetterList(letterList)
    
    this.#attachNodeList(node, letterNodeList);

    return node
  }

  #createNodeFromWordList(wordList) {
    return wordList
      .map((word) => this.#createNodeFromWord(word));
  }

  #createBoardNode(text) {
    const node = this.#createGenericNode("div", "board");

    const word = text.trim();
    const wordList = text.split(" ");
    const wordNodeList = this.#createNodeFromWordList(wordList);
    
    this.#attachNodeList(node, wordNodeList);

    return node;
  }

  loadView(text) {
    const boardNode = this.#createBoardNode(text);
    document.body.appendChild(boardNode);
  }
}

// infrastructure layer (repository)
class Repository {
  #text;

  constructor() {
    this.#text = "";
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    this.#text = text;
  }
}
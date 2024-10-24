import { getDivEl } from './service.js';

export class Card {
  _opened = false;
  _matched = false;

  constructor(container, number, action) {
    this.container = container;
    this.getCard();
    this.action = action;
    this.number = number;
  }

  getCard() {
    this.card = getDivEl('game__card');
    this.card.textContent = this.number;
    this.card.addEventListener('click', () => {
      // can't press on one card twice
      if (this.opened === false && this.matched === false) {
        this.opened = true;
        this.action(this);
      };
    });

    this.container.append(this.card);
  }

  // --- opening card ---

  set opened(value) {
    this._opened = value;
    if (value) {
      this.card.classList.add('opened');
    } else {
      this.card.classList.remove('opened');
    };
  }

  get opened() {
    return this._opened;
  }

  // --- when the cards matched ---

  set matched(value) {
    this._opened = value;
    if (value) {
      this.card.classList.add('matched');
    } else {
      this.card.classList.remove('matched');
    };
  }

  get matched() {
    return this._matched;
  }
};

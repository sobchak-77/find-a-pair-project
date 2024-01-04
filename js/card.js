export default class Card {
  _opened = false
  _matched = false

  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number;
    // добавляем событие по клику - открываем карточку
    this.card.addEventListener('click', () => {
      if (this.opened == false && this.matched == false) {
        // classList.add можно убрать, set добавит класс
        this.opened = true;
        action(this);
      };
    });
    // контейнер, куда добавить карточку
    container.append(this.card);
  };

  set opened(value) {
    this._opened = value;
    value ? this.card.classList.add('opened') : this.card.classList.remove('opened');
  }

  get opened() {
    return this._opened;
  }

  set matched(value) {
    this._opened = value;
    value ? this.card.classList.add('matched') : this.card.classList.remove('matched');
  }

  get matched() {
    return this._opened;
  }
}
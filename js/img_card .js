import { Card } from './card.js';
import { getImg } from './service.js';

export class ImgCard extends Card {

  set number(value) {
    this._number = value;

    const paramClass = 'game__card-img';
    const paramSrc = `sobchak-77.github.io/img/sock_${value}.svg`;
    const paramAlt = 'Sock';

    this.img = getImg(paramClass, paramSrc, paramAlt);
    this.img.onerror = () => {
      this.img.src = 'sobchak-77.github.io/img/no_sock.png';
      throw new Error('You have problems with image loading');
    };

    this.card.append(this.img);
  }

  get number() {
    return this._number;
  }
};

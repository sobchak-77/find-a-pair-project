import { Card } from './card.js';
import { getImg } from './service.js';

export class ImgCard extends Card {

  set number(value) {
    this._number = value;

    const paramClass = 'game__card-img';
    const paramSrc = `/find-a-pair-project/img/sock_${value}.svg`;
    const paramAlt = 'Sock';

    this.img = getImg(paramClass, paramSrc, paramAlt);
    this.img.onerror = () => {
      this.img.src = '/find-a-pair-project/img/no_sock.png';
      throw new Error('You have problems with image loading');
    };

    this.card.append(this.img);
  }

  get number() {
    return this._number;
  }
};

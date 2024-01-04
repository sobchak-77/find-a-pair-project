import Card from './card.js';

function newGame(container, cardCount) {
  cardCount = cardCount;
  let cardNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;
  // создаем переменную для кнопки
  const box = document.getElementById('box');

  for (let i = 1; i <= cardCount / 2; i++) {
    cardNumberArray.push(i, i);
  };
  // перемешиваем массив
  cardNumberArray = cardNumberArray.sort(() => Math.random() - 0.5);
  
  for (const cardNumber of cardNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  };
  // функция логики игры
  function flip(card) {
    // если две открытые карточки не совпали, мы их закрываем
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.opened = false;
        secondCard.opened = false;
        firstCard = null;
        secondCard = null;
      };
    };
    // заполняем карточки
    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    };
    // совпадение двух карточек, оставляем их открытыми
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.matched = true;
        secondCard.matched = true;
        firstCard = null;
        secondCard = null;
      };
    };
    // если количество элементов с классом "matched" равна длинне массива cardNumberArray (количество карточек), то сбрасываем параметры и запускаем функцию заново
    if (document.querySelectorAll('.card.matched').length == cardNumberArray.length) {
      
      container.innerHTML = '',
      cardNumberArray = [],
      cardsArray = [],
      firstCard = null,
      secondCard = null;

      const btnWrap = document.createElement('div');
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Давай ещё!';
      box.append(btnWrap);
      btnWrap.append(restartButton);
      btnWrap.classList.add('btn-wrap');
      restartButton.classList.add('btn');
      restartButton.addEventListener('click', () => {
        newGame(container, cardCount);
        restartButton.classList.add('btn-hidden');
      });
    };
  };
};



newGame(document.getElementById('game-box'), 16);

// --- create a div element ---
export function getDivEl(className) {
  const divEl = document.createElement('div');
  divEl.classList.add(className);

  return divEl;
};

// --- get an image element ---
export function getImg(className, url, imgAlt) {
  const imgEl = document.createElement('img');
  imgEl.classList.add(className);
  imgEl.src = url;
  imgEl.alt = imgAlt;

  return imgEl;
};

// --- get numbers array ---
export function createNumArr(pairs) {
  let cardNumArr = [];

  for (let i = 1; i <= pairs; i++) {
    cardNumArr.push(i, i);
  };

  return cardNumArr;
};

// --- get shuffle numbers array ---
export function shuffleArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  return arr;
};

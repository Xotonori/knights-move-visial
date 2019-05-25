/*Создаем массивы из букв и цыфр*/
const letters = ['a','b','c','d','e','f','g','h'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const board = document.getElementById('board');
const chessBoard = [];


/*Делаем массив со всеми возможными вариантами клеток*/
for (let i = 0; i < letters.length; i++) {
  for (let j = 1; j <= letters.length; j++) {
    chessBoard.push(letters[i] + j);
  }
}

/*Проверка точки на существование после хода коня*/
const checkLetAndNum = (let, num) => {
  if (let == undefined || num == undefined) {
    return false;
  }
  return true;
}

/*Добавление точки в конечный массив*/
const addPointToArr = (position, result) => {
  if (position == null) {
    return false;
  }
  result.push(position);
}

/*Функция определения всех возможных точек хода*/
const determineAllPos = (indexLetter, indexNumber) => {
  const allMovePoint = [-1, +1, -2, +2]; //Массив из 4 вариантов движений
  const result = [];
  let newPosition = '';
  /*Далее перебераем цыкл сам с собой, чтобы получить все варианты хода*/
  for (let i = 0; i < allMovePoint.length; i++) {
    for (let j = 0; j < allMovePoint.length; j++) {
      //Сравниваем модули чисел чтобы отсеить ненужные варианты типа: (+1,-1);(+2,-2)...
      if (Math.abs(allMovePoint[i]) !== Math.abs(allMovePoint[j])) {
        const letter = letters[indexLetter + allMovePoint[i]];
        const number = numbers[indexNumber + allMovePoint[j]];
        if (checkLetAndNum(letter, number)) {
          newPosition = letter + number;
        } else {
          newPosition = null;
        }
        addPointToArr(newPosition, result);
      }
    }
  }
  return result;
};


/*Подсвечиваем нажатую клетку*/
const highlightCurrentPoint = (point) => {
  point.style = "background-color: #386bec";
};

/*Подсвечиваем клетки возможных ходов*/
const highlightMovePoint = (points) => {
  for (i = 0; i < points.length; i++) {
    let movePoint = document.getElementById(points[i]);
    movePoint.style = "background-color: #00ff7e";
  }
};

/*Возвращаем не задействанные клетки в исходный цвет*/
const clearColor = () => {
  for (i = 0; i < chessBoard.length; i++) {
    let point = document.getElementById(chessBoard[i]);
    if (point.classList[0] === 'black-point') {
      point.style = "background-color: #000";
    } else {
      point.style = "background-color: #fff";
    }
  }
};

/*Подсвечиваем все возможные ходы при клике*/
board.onclick = function(event) {
  clearColor();

  let position = event.target;
  highlightCurrentPoint(position);

  let indexLetter = letters.indexOf(position.id[0]);
  let indexNumber = numbers.indexOf(Number(position.id[1]));
  let result = determineAllPos(indexLetter, indexNumber);
  highlightMovePoint(result);

};




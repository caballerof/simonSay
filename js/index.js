const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');

class Game {
  constructor() {
    this.initializer();
  } // End constructor

  initializer() {
    btnEmpezar.classList.add('hide');
  } // End initializer
} // End Juego

function startGame() {
  var game = new Game();
} // End startGame

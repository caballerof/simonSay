const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const lvlTag = document.getElementById('level');
/**
 * Final level to win the game.
 */
const finalLevel = 10;
/**
 * Numbers of colors in the game.
 */
const numberOfColors = 4;

class Game {
  constructor() {
    this.initializer = this.initializer.bind(this);
    this.initializer();
    this.generateSequence();
    setTimeout(this.nextLevel, 700);
  } // End constructor

  /**
   * Initialize the parameters of the game.
   */
  initializer() {
    this.level = 1;
    this.changeTagLevel(`Da click en el botón empezar juego`);
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.removeButtonListener = this.removeButtonListener.bind(this);
    this.toggleBtnStart();
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde
    };
  } // End initializer

  /**
   * Show a text `String` on html control.
   * @param {String} text message to display.
   */
  changeTagLevel(text = ``) {
    lvlTag.innerText = text;
  } //End changeTagLevel

  /**
   * Does the logic when the game change to the next level.
   */
  nextLevel() {
    this.subLevel = 0;
    this.changeTagLevel(this.level);
    this.illuminateSequence();
    this.addButtonListener();
  } // End nextLevel

  /**
   * Add a click listener for every button in the game.
   */
  addButtonListener() {
    for (const color in this.colors) {
      this.colors[color].addEventListener(`click`, this.chooseColor);
    }
  } // End addButtonListener

  /**
   * Remove a click listeners for every button in the game.
   */
  removeButtonListener() {
    for (const color in this.colors) {
      this.colors[color].removeEventListener(`click`, this.chooseColor);
    }
  } // End removeButtonListener

  chooseColor(event) {
    console.log(this);
    const nameColor = event.target.dataset.color;
    const numberColor = this.changeColorToNumber(nameColor);
    this.illuminateColor(nameColor);
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;

        this.removeButtonListener();
        if (this.level === finalLevel + 1) {
          this.youWonGame();
        } else {
          setTimeout(this.nextLevel, 1000);
        }
      }
    } else {
      this.youLostGame();
    }
  } // End chooseColor

  /**
   * Illuminate a sequence based on the current level in the game.
   */
  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.changeNumberToColor(this.sequence[i]);
      setTimeout(() => this.illuminateColor(color), 1000 * i);
    }
  } // End illuminateSequence

  /**
   * Illuminates a specific color in the game board.
   * @param {String} color color name to illuminates.
   */
  illuminateColor(color) {
    this.colors[color].classList.add(`light`);
    setTimeout(() => this.turnOffColor(color), 450);
  } // End illuminateColor

  /**
   * Darkens a specific color in the game board.
   * @param {*} color color name color to Darken.
   */
  turnOffColor(color) {
    this.colors[color].classList.remove(`light`);
  } // End turnOffColor

  /**
   * Changes a given number color `Number` into their equivalent color name `String`.
   * @param {Number} color Given number to change into a name.
   * @return  `String` that represent a color.
   */
  changeNumberToColor(number) {
    switch (number) {
      case 0:
        return `celeste`;
      case 1:
        return `violeta`;
      case 2:
        return `naranja`;
      case 3:
        return `verde`;
    }
  } // End changeNumberToColor

  /**
   * Changes a given color name `String` into their equivalent color number `Number`.
   * @param {String} color Given color to change into a number.
   * @return  `Number` that represent a color.
   */
  changeColorToNumber(color) {
    switch (color) {
      case `celeste`:
        return 0;
      case `violeta`:
        return 1;
      case `naranja`:
        return 2;
      case `verde`:
        return 3;
    }
  } // End changeColorToNumber

  /**
   * Generate and fill an array with a sequence of random numbers.
   */
  generateSequence() {
    this.sequence = new Array(finalLevel)
      .fill(0)
      .map(element => Math.floor(Math.random() * numberOfColors));
  } // End generateSequence

  /**
   * Hides or displays the button to start to play
   */
  toggleBtnStart() {
    if (btnEmpezar.classList.contains('hide'))
      btnEmpezar.classList.remove('hide');
    else btnEmpezar.classList.add('hide');
  } // End toggleBtnStart

  /**
   * Show the message when the player won the game and restart the game.
   */
  youWonGame() {
    swal('¡Felicidades!', '¡Ganaste!', 'success').then(() =>
      this.initializer()
    );
  } // End youWonGame

  /**
   * Show the message when the player lost the game and restart the game.
   */
  youLostGame() {
    swal('¡Lo siento!', ' ¡Perdiste! =( ', 'error').then(() => {
      this.removeButtonListener();
      this.initializer();
    });
  } // End youLostGame
} // End class

function startGame() {
  window.game = new Game();
} // End startGame

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
const numberOfColors = 4;

class Game {
  constructor() {
    this.initializer();
    this.generateSequence();
    this.nextLevel();
  } // End constructor

  initializer() {
    this.level = 1;
    this.changeTagLevel();
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    btnEmpezar.classList.add('hide');
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde
    };
  } // End initializer

  changeTagLevel() {
    lvlTag.innerText = this.level;
  }

  nextLevel() {
    this.subLevel = 0;
    this.illuminateSequence();
    this.addButtonListener();
  }

  addButtonListener() {
    for (const color in this.colors) {
      this.colors[color].addEventListener(`click`, this.chooseColor);
    }
  }

  removeButtonListener() {
    /*
    for (const color in this.colors) {
      this.colors[color].removeEventListener(
        `click`,
        this.chooseColor.bind(this)
      );
    }
    */
    this.colors.celeste.removeEventListener(
      `click`,
      this.chooseColor.bind(this)
    );
    this.colors.violeta.removeEventListener(
      `click`,
      this.chooseColor.bind(this)
    );
    this.colors.naranja.removeEventListener(
      `click`,
      this.chooseColor.bind(this)
    );
    this.colors.verde.removeEventListener(`click`, this.chooseColor.bind(this));
  }

  chooseColor(event) {
    console.log(this);
    const nameColor = event.target.dataset.color;
    const numberColor = this.changeColorToNumber(nameColor);
    this.illuminateColor(nameColor);
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.changeTagLevel();
        this.removeButtonListener();
        if (this.level === finalLevel + 1) {
          alert(`Ganaste`);
          console.log(`gano`);
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      console.log(`Perdió`);
      alert(`Perdió`);
      //btnEmpezar.classList.remove(`hide`);
    }
  }

  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.changeNumberToColor(this.sequence[i]);
      setTimeout(() => this.illuminateColor(color), 1000 * i);
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add(`light`);
    setTimeout(() => this.turnOffColor(color), 450);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove(`light`);
  }

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

  generateSequence() {
    this.sequence = new Array(finalLevel)
      .fill(0)
      .map(element => Math.floor(Math.random() * numberOfColors));
  }
} // End class

function startGame() {
  window.game = new Game();
} // End startGame

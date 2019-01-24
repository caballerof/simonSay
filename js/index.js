const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const finalLevel = 10;
class Game {
  constructor() {
    this.initializer();
    this.generateSequence();
    this.nextLevel();
  } // End constructor

  initializer() {
    btnEmpezar.classList.add('hide');
    this.level = 1;
    this.colors = {
      celeste,
      violeta,
      naranja,
      verde
    };
  } // End initializer

  nextLevel() {
    this.subLevel = 0;
    this.illuminateSequence();
    this.addButtonListener();
  }

  addButtonListener() {
    /*
    for (const color in this.colors) {
      this.colors[color].addEventListener(`click`, this.chooseColor.bind(this));
    }
    */
    this.colors.celeste.addEventListener(`click`, this.chooseColor.bind(this));
    this.colors.violeta.addEventListener(`click`, this.chooseColor.bind(this));
    this.colors.naranja.addEventListener(`click`, this.chooseColor.bind(this));
    this.colors.verde.addEventListener(`click`, this.chooseColor.bind(this));
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
    const nameColor = event.target.dataset.color;
    const numberColor = this.changeColorToNumber(nameColor);
    this.illuminateColor(nameColor);
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.removeButtonListener();
        if (this.level === finalLevel + 1) {
          console.log(`gano`);
        } else {
          setTimeout(this.nextLevel.bind(this), 1500);
        }
      }
    } else {
      console.log(`Perdió`);
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
  }

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
  }

  generateSequence() {
    this.sequence = new Array(finalLevel)
      .fill(0)
      .map(element => Math.floor(Math.random() * 4));
  }
} // End Juego

function startGame() {
  window.game = new Game();
} // End startGame

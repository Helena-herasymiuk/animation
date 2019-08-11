'use strict'
class Animation {
  constructor({ element }) {
    this._element = element;
    this.colors = ['red', 'blue', 'green', 'yellow'];
    this.circles = this._blocks();

    this._render();
    this._blinkingBlocks();
    this._colorOfBlock();
    this._blocks();

    this._element.addEventListener('click', (event) => {
      const button = this._element.querySelector('.animation__centr');
      if (event.target !== button && event.target !== button.firstElementChild) {
        return;
      }
      this._transform();
    });
  }

  _transform() {
    const elemCircles = document.querySelectorAll('.animation__elem');
    [...elemCircles].forEach((elem, i) => {
      if (elem.classList.contains('circled')) {
        elem.style.transform = 'translate(0)';
        elem.classList.remove('circled');
        return;
      }
      elem.classList.add('circled');
      if (i < 3) {
        elem.style.transform = `translate(${(i * -15)}px)`;
      } else if (i < 6) {
        elem.style.transform = `translate(${((i - 3) * 15) - 20}px)`;
      } else if (i < 9) {
        elem.style.transform = `translateY(${((i - 6) * 15) + 10}px)`;
      } else if (i < 12) {
        elem.style.transform = `translateY(${((i - 9) * -15) + 40}px)`;
      } else if (i < 15) {
        elem.style.transform = `translate(${((i - 12) * 15) - 10}px)`;
      } else if (i < 18) {
        elem.style.transform = `translate(${((i - 15) * -15) + 20}px)`;
      } else if (i < 21) {
        elem.style.transform = `translateY(${((i - 18) * -15)}px)`;
      } else if (i < 24) {
        elem.style.transform = `translateY(${((i - 21) * 15) - 35}px)`;
      }
    });
  }

  _colorOfBlock(i) {
    switch (i % 4) {
      case 0:
        return this.colors[0];
      case 1:
        return this.colors[1];
      case 2:
        return this.colors[2];
      default:
        return this.colors[3];
    }
  }

  _blinkingBlocks() {
    const change = () => {
      this.colors = this.colors.map((elem) => {
        switch (elem) {
          case 'green':
            return 'blue';
          case 'yellow':
            return 'green';
          case 'blue':
            return 'red';
          case 'red':
            return 'yellow';
        }
      });
      const elemCircles = document.querySelectorAll('.animation__elem');
      [...elemCircles].forEach((elem, i) => {
        elem.style.backgroundColor = this._colorOfBlock(i);
      });
    };
    setInterval(change, 500);
  }

  _blocks() {
    const arr = [];
    for (let i = 1; i < 25; i++) {
      arr.push(`
        <div class="animation__elem" 
             style="background-color: ${this._colorOfBlock(i)}">
        </div>`);
    }
    return arr;
  }

  _render() {
    this._element.innerHTML = `
      <div class="animation__centr">
          <h1>Change</h1>
      </div>
      <div class="animation__left">
        ${this.circles.slice(0, 6).join(' ')}
      </div>
      <div class="animation__down">
        ${this.circles.slice(6, 12).join(' ')}
      </div>
     <div class="animation__right">
        ${this.circles.slice(12, 18).join(' ')}
      </div>
      <div class="animation__top">
        ${this.circles.slice(18, 24).join(' ')}
      </div>
    `;
  }
}

const animation = new Animation({
  element: document.querySelector('.animation'),
});

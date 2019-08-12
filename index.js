"use strict";

class Animation {
  constructor({ element, oneSideElements }) {
    this._element = element;
    this.colors = ['red', 'blue', 'green', 'yellow'];
    this.oneSide = oneSideElements;
    this.circles = this._blocks(this.oneSide);

    this._render();
    this._blinkingBlocks();
    this._colorOfBlock();
    this._blocks();
    this._setSizes();

    this.button = this._element.querySelector('.animation__centr');
    this.button.addEventListener('click', () => {
      this._transform();
    });
  }

  _transform() {
    const elemCircles = document.querySelectorAll('.animation__elem');
    [...elemCircles].forEach((elem) => {
      if (elem.classList.contains('circled')) {
        elem.style.transform = 'translate(0)';
        elem.classList.remove('circled');
        return;
      }
      elem.classList.add('circled');
    });

    const getSqrt = (i) => {
      return Math.sqrt((i - this.oneSide + 1) * -1) || 0.3
    }
    const halfSide = this.oneSide / 2;
    const multi = 40;

    const leftSideElem = document.querySelectorAll('.animation__left > .animation__elem.circled');
    [...leftSideElem].forEach((elem, i) => {
      if (i < halfSide) {
        elem.style.transform = `translate(${(Math.sqrt(i || 0.4) * -multi) + 20}px)`;
      } else if (i < this.oneSide) {
        elem.style.transform = `translate(${(getSqrt(i) * -multi) + 20}px)`;
      }
    });

    const rightSideElem = document.querySelectorAll('.animation__right > .animation__elem.circled');
    [...rightSideElem].forEach((elem, i) => {
      if (i < halfSide) {
        elem.style.transform = `translate(${(Math.sqrt(i || 0.2) * multi) - 10}px)`;
      } else if (i < this.oneSide) {
        elem.style.transform = `translate(${(getSqrt(i) * multi) - 5}px)`;
      }
    });

    const topSideElem = document.querySelectorAll('.animation__top > .animation__elem.circled');
    [...topSideElem].forEach((elem, i) => {
      if (i < halfSide) {
        elem.style.transform = `translateY(${(Math.sqrt(i || 0.2) * -multi) + 5}px)`;
      } else if (i < this.oneSide) {
        elem.style.transform = `translateY(${getSqrt(i) * -multi}px)`;
      }
    });

    const downSideElem = document.querySelectorAll('.animation__down > .animation__elem.circled');
    [...downSideElem].forEach((elem, i) => {
      if (i < halfSide) {
        elem.style.transform = `translateY(${Math.sqrt(i || 0.4) * multi}px)`;
      } else if (i < this.oneSide) {
        elem.style.transform = `translateY(${getSqrt(i) * multi}px)`;
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
          default:
            return 'orange';
        }
      });
      const elemCircles = document.querySelectorAll('.animation__elem');
      [...elemCircles].forEach((elem, i) => {
        elem.style.backgroundColor = this._colorOfBlock(i);
      });
    };
    setInterval(change, 500);
  }

  _blocks(x) {
    const arr = [];
    for (let i = 1; i <= (x * 4); i++) {
      arr.push(`
        <div class="animation__elem" 
             style="background-color: ${this._colorOfBlock(i)}">
             ${i}
        </div>`);
    }
    return arr;
  }

  _setSizes() {
    const vertical = document.querySelectorAll('.vertical');
    vertical.forEach((el) => {
      el.style.height = `${this.oneSide * 50 + 30}px`;
    });
    const horizontal = document.querySelectorAll('.horizontal');
    horizontal.forEach((el) => {
      el.style.width = `${this.oneSide * 50 + 30}px`;
    });
    this._element.style.width = `${(this.oneSide + 3) * 50}px`;
    this._element.style.height = `${(this.oneSide + 2) * 50}px`;
  }

  _render() {
    this._element.innerHTML = `
      <div class="animation__centr">
          <h1>Change</h1>
      </div>
      <div class="animation__left vertical">
        ${this.circles.slice(0, this.oneSide).join(' ')}
      </div>
      <div class="animation__down horizontal">
        ${this.circles.slice(this.oneSide, this.oneSide * 2).join(' ')}
      </div>
     <div class="animation__right vertical">
        ${this.circles.slice(this.oneSide * 2, this.oneSide * 3).join(' ')}
      </div>
      <div class="animation__top horizontal">
        ${this.circles.slice(this.oneSide * 3, this.oneSide * 4).join(' ')}
      </div>
    `;
  }
}

const animation = new Animation({
  element: document.querySelector('.animation'),
  oneSideElements: 6
});

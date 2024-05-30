"https://stackoverflow.com/questions/71165923/how-do-i-make-an-infinite-marquee-with-js";
const lerp = (current, target, factor) =>
  current * (1 - factor) + target * factor;

class LoopingText {
  constructor(el, { direction, speed, sppedMultipier }) {
    this.el = el;
    this.lerp = { current: 0, target: 0 };
    this.interpolationFactor = 0.1;
    this.speed = speed ?? 0.2;
    this.direction = direction ?? 1; // -1 (to-left), 1 (to-right)
    this.sppedMultipier = sppedMultipier ?? 5;

    // Init
    this.el.style.cssText = `position: relative; display: inline-flex; white-space: nowrap;`;
    this.el.children[1].style.cssText = `position: absolute; left: ${
      100 * -this.direction
    }%;`;
    this.events();
    this.render();
  }

  events() {
    window.addEventListener(
      "scroll",
      () => (this.lerp.target += this.speed * 5)
    );
  }

  animate() {
    this.lerp.target += this.speed;
    this.lerp.current = lerp(
      this.lerp.current,
      this.lerp.target,
      this.interpolationFactor
    );

    if (this.lerp.target > 100) {
      this.lerp.current -= this.lerp.target;
      this.lerp.target = 0;
    }

    const x = this.lerp.current * this.direction;
    this.el.style.transform = `translateX(${x}%)`;
  }

  render() {
    this.animate();
    window.requestAnimationFrame(() => this.render());
  }
}

function shuffleArray(origianlArray) {
  const array = [...origianlArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const players = [
  "Andrea Omati",
  "Gabriele Affuso",
  "Francesca Mandelli",
  "Federico Quarenghi",
  "Federico Spini",
  "Antoneta Deda",
  "Marta Carlotti",
  "Stefania Casiraghi",
  "Eleonora Dusi",
  "Gaia Sartor",
];

const scroller = document.querySelector(".info-section__loop-list");
Array(20)
  .fill("")
  .forEach(() => {
    scroller.innerHTML += `<li class="loop-container">
  <div class="loop-container__item"></div>
  <div class="loop-container__item"></div>
</li>`;
  });

document.querySelectorAll(".loop-container__item").forEach((e) => {
  shuffleArray(players).forEach((name) => {
    const span = document.createElement("span");
    span.textContent = name;
    e.appendChild(span);
  });
});

document.querySelectorAll(".loop-container").forEach(
  (el, i) =>
    new LoopingText(el, {
      direction: i % 2 === 0 ? 1 : -1,
      sppedMultipier: 0.5,
      speed: 0.1,
    })
);

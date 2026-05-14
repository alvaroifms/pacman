const container = document.querySelector(`.container`)
const mapa = [
  { linha: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2] },
  { linha: [2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2] },
  { linha: [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2] },
  { linha: [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2] },
  { linha: [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2] },
  { linha: [2,1,2,2,2,1,2,1,2,2,2,2,2,1,2,1,2,2,2,1,2] },
  { linha: [2,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2] },
  { linha: [2,2,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,2,2] },
  { linha: [1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1] },
  { linha: [2,2,2,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,2,2,2] },
  { linha: [1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1] },
  { linha: [2,2,2,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,2,2,2] },
  { linha: [1,1,1,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,1,1,1] },
  { linha: [1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1] },
  { linha: [2,2,2,2,2,1,1,1,2,2,2,2,2,1,1,1,2,2,2,2,2] },
  { linha: [2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2] },
  { linha: [2,1,2,2,2,1,2,2,2,1,2,1,2,2,2,1,2,2,2,1,2] },
  { linha: [2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2] },
  { linha: [2,2,1,1,2,1,2,1,2,2,2,2,2,1,2,1,2,1,1,2,2] },
  { linha: [2,1,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2] },
  { linha: [2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2] },
  { linha: [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2] },
  { linha: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2] }
];


function render() {
  container.innerHTML = '';

  for (let i = 0; i < mapa.length; i++) {
    for (let j = 0; j < mapa[i].linha.length; j++) {

      const quad = document.createElement('div');
      const atual = mapa[i].linha[j];

      const cima = mapa[i - 1]?.linha[j];
      const baixo = mapa[i + 1]?.linha[j];
      const esquerda = mapa[i]?.linha[j - 1];
      const direita = mapa[i]?.linha[j + 1];

      if (atual === 2) {
        quad.classList.add('parede');

        if (cima !== 2) quad.classList.add('topo');
        if (baixo !== 2) quad.classList.add('baixo');
        if (esquerda !== 2) quad.classList.add('esquerda');
        if (direita !== 2) quad.classList.add('direita');

      } else {
        quad.classList.add('chao');
      }


      if (player.x === j && player.y === i) {
        quad.classList.add('player');
      }

      container.append(quad);
    }
  }
}

let player = {
  x: 1,
  y: 1
};

render();

document.addEventListener('keydown', (e) => {
    let novoX = player.x;
    let novoY = player.y;

    if (e.key === 'ArrowUp') novoY--;
    if (e.key === 'ArrowDown') novoY++;
    if (e.key === 'ArrowLeft') novoX--;
    if (e.key === 'ArrowRight') novoX++;

    if (mapa[novoY]?.linha[novoX] !== 2) {
        player.x = novoX;
        player.y = novoY;
    }

    render();
});
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
  { linha: [3,3,3,3,2,1,2,1,1,1,1,1,1,1,2,1,2,3,3,3,3] },
  { linha: [2,2,2,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,2,2,2] },
  { linha: [0,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,0] },
  { linha: [2,2,2,2,2,1,2,1,2,1,1,1,2,1,2,1,2,2,2,2,2] },
  { linha: [3,3,3,3,2,1,2,1,2,2,2,2,2,1,2,1,2,3,3,3,3] },
  { linha: [3,3,3,3,2,1,2,1,1,1,1,1,1,1,2,1,2,3,3,3,3] },
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

let direcaoAtual = null;
let loopJogo = null;


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

      }



      if (player.x === j && player.y === i) {
        quad.classList.add('player');
      }

       
      if (atual === 1 && !(player.x === j && player.y === i)) {
      const ponto = document.createElement('div');
      ponto.classList.add('ponto');
      quad.classList.add(`chao`)
      quad.append(ponto);
    } else if (atual === 3) {
    quad.classList.add('chao');
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
let contador = 0;

document.addEventListener("keydown", (e) => {
  switch(e.key) {
        case "ArrowUp": 
          direcaoAtual = "cima";
        break;
        case "ArrowDown": 
          direcaoAtual = "baixo";
        break;
        case "ArrowLeft": 
          direcaoAtual = "esquerda";
        break;
        case "ArrowRight": 
          direcaoAtual = "direita";
        break;
        default: return;
      }
  
      if (!loopJogo) {
        loopJogo = setInterval(atualizarMovimento, 150);
      }
});

function atualizarMovimento() {
      let novoX = player.x;
      let novoY = player.y;
     const score = document.querySelector('#score');

    switch (direcaoAtual) {
      case "cima":
        novoY--;
        break;
      case "baixo":
        novoY++;
        break;
      case "esquerda":
        novoX--;
        break;
      case "direita":
        novoX++;
        break;
    }

    const destino = mapa[novoY]?.linha[novoX];

    if (destino === undefined || destino === 2) {
      clearInterval(loopJogo);
      loopJogo = null;
      direcaoAtual = null;
      return;
    };

    if (destino === 0) {
        if (novoX < player.x) {
            novoX = mapa[0].linha.length - 2;
        } else {
            novoX = 1;
        }
    }

if (mapa[novoY].linha[novoX] === 1) {
        mapa[novoY].linha[novoX] = 3;
        contador++;
        if (score) score.textContent = `Pontos: ${contador}`;  
    }

    player.x = novoX;
    player.y = novoY;
    render();
};
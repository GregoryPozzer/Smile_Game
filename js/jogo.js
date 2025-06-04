let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Reinicia tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função que reseta o estado das cartas
function jogarNovamente() {
  jogar = true;

  // Limpa as divs com id de 0 a 5
  for (let i = 0; i <= 5; i++) {
    const div = document.getElementById(i.toString());
    if (div) {
      div.className = 'inicial';

      // Remove qualquer imagem dentro da carta
      const imagens = div.getElementsByTagName('img');
      while (imagens.length > 0) {
        imagens[0].remove();
      }
    }
  }

  // Limpa mensagem de erro se existir
  const mensagemErro = document.getElementById('mensagemErro');
  if (mensagemErro) {
    mensagemErro.innerHTML = '';
  }
}

// Atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Quando acerta
function acertou(obj) {
  obj.className = "acertou";
  obj.classList.add('acertouAnimacao');

  const img = new Image(100);
  img.src = "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/163A6/production/_104764019_gettyimages-873395522.jpg.webp";
  img.id = "imagem";
  obj.appendChild(img);

  setTimeout(() => {
    obj.classList.remove('acertouAnimacao');
  }, 500);
}

// Quando erra
function errou(obj, sorteado) {
  obj.className = "erro";
  obj.classList.add('erroAnimado');

  const imgErro = new Image(50);
  imgErro.src = "https://images.icon-icons.com/3413/PNG/512/sad_emoji_icon_217677.png";
  imgErro.alt = "Erro!";
  obj.appendChild(imgErro);

  setTimeout(() => {
    obj.classList.remove('erroAnimado');
    imgErro.remove();
  }, 1000);

  // Mostra onde estava o Slime
  const objSorteado = document.getElementById(sorteado);
  if (objSorteado) {
    acertou(objSorteado);
  }

  // Mensagem de erro
  const mensagemErro = document.getElementById('mensagemErro');
  if (mensagemErro) {
    mensagemErro.innerHTML = "Você errou! Tente novamente!";
    mensagemErro.style.color = 'red';
    mensagemErro.classList.add('mensagemErroAnimada');
    setTimeout(() => {
      mensagemErro.classList.remove('mensagemErroAnimada');
    }, 500);
  }
}

// Verifica jogada
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente"');
    return;
  }

  jogar = false;
  tentativas++;

  const sorteado = Math.floor(Math.random() * 6); // de 0 a 5

  if (obj.id == sorteado.toString()) {
    acertos++;
    acertou(obj);
  } else {
    errou(obj, sorteado);
  }

  atualizaPlacar(acertos, tentativas);

  if (tentativas === 10) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

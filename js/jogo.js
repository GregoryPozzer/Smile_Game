let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const mensagemErro = document.getElementById('mensagemErro');
const resposta = document.getElementById('resposta');

// Atualiza visibilidade dos botões
function alternarBotoes(jogarVisivel) {
  const mostrar = (btn, visivel) =>
    btn.classList.replace(visivel ? 'invisivel' : 'visivel', visivel ? 'visivel' : 'invisivel');

  mostrar(btnJogarNovamente, jogarVisivel);
  mostrar(btnReiniciar, !jogarVisivel);
}

// Reinicia tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  alternarBotoes(true);
}

// Reseta o estado das cartas
function jogarNovamente() {
  jogar = true;

  for (let i = 0; i <= 5; i++) {
    const div = document.getElementById(i);
    if (div) {
      div.className = 'inicial';
      div.textContent = i;
    }
  }

  if (mensagemErro) mensagemErro.textContent = '';
}

// Atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas ? (acertos / tentativas) * 100 : 0;
  resposta.textContent = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Quando acerta
function acertou(obj) {
  obj.className = "acertou";
  obj.classList.add('acertouAnimacao');

  const img = new Image(100);
  img.src = "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/163A6/production/_104764019_gettyimages-873395522.jpg.webp";
  img.id = "imagem";

  obj.innerHTML = '';
  obj.appendChild(img);

  setTimeout(() => obj.classList.remove('acertouAnimacao'), 500);
}

// Quando erra
function errou(obj, sorteado) {
  obj.className = "erro";
  obj.classList.add('erroAnimado');

  const imgErro = new Image(50);
  imgErro.src = "https://images.icon-icons.com/3413/PNG/512/sad_emoji_icon_217677.png";
  imgErro.alt = "Erro!";

  obj.innerHTML = '';
  obj.appendChild(imgErro);

  setTimeout(() => {
    obj.classList.remove('erroAnimado');
    obj.textContent = obj.id;
  }, 1000);

  const objSorteado = document.getElementById(sorteado);
  if (objSorteado) acertou(objSorteado);

  if (mensagemErro) {
    mensagemErro.textContent = "Você errou! Tente novamente!";
    mensagemErro.style.color = 'red';
    mensagemErro.classList.add('mensagemErroAnimada');
    setTimeout(() => mensagemErro.classList.remove('mensagemErroAnimada'), 500);
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

  const sorteado = Math.floor(Math.random() * 6);

  if (obj.id === sorteado.toString()) {
    acertos++;
    acertou(obj);
  } else {
    errou(obj, sorteado);
  }

  atualizaPlacar(acertos, tentativas);

  if (tentativas === 10) {
    alternarBotoes(false);
  }
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);




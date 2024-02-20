// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumeroEscolhido = [];

let numeros = 20;

let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeros}:`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas> 1 ? 'tentativas':'tentativa';
            exibirTextoNaTela('p', `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chutar').setAttribute('disabled', true);
    }
    else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Não desanime!');
            exibirTextoNaTela('p', `O número é menor do que ${chute}!` );
        }
        else{
            exibirTextoNaTela('h1', 'Não desanime!');
            exibirTextoNaTela('p', `O número é maior do que ${chute}!` );
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * parseInt(numeros) + 1);
    let quantidadeDeElementosNaLista = listaNumeroEscolhido.length;
    if (quantidadeDeElementosNaLista == parseInt(numeros)) {
        listaNumeroEscolhido = [];
    }
    if (listaNumeroEscolhido.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumeroEscolhido.push(numeroEscolhido);
        console.log(listaNumeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}
let amigos = [];

// Adicionar amigo
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    if (!nome) {
        alert("Por favor, digite um nome válido.");
        if (responsiveVoice) {
            responsiveVoice.speak("Por favor, digite um nome válido.", "Brazilian Portuguese Female");
        }
        return;
    }

    amigos.push(nome);
    atualizarLista();
    atualizarEstadoSortear();
    input.value = "";
    input.focus();
}

// Atualizar lista com botão de remover
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botão remover individual
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌"; // emoji X
        btnRemover.classList.add("button-remove");

        btnRemover.addEventListener("click", () => {
            amigos.splice(index, 1); // remove do array
            atualizarLista();
            atualizarEstadoSortear(); // atualiza botão sortear
        });

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

// Sortear amigo
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Adicione pelo menos um nome antes de sortear!");
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const sorteado = amigos[indice];
    amigos.splice(indice, 1);
    atualizarLista();
    atualizarEstadoSortear();

    document.getElementById("resultado").innerHTML += 
        `<li>O amigo secreto sorteado é: <strong>${sorteado}</strong></li>`;
    if (responsiveVoice) {
        responsiveVoice.speak(`O amigo secreto sorteado é: ${sorteado}`, "Brazilian Portuguese Female");
    }

    // Desabilitar input e adicionar
    document.getElementById("amigo").disabled = true;
    document.querySelector(".button-add").disabled = true;

    // Mostrar aviso
    document.getElementById("avisoLista").style.display = "block";

    // Esconder todos os botões de remover
    document.querySelectorAll(".button-remove").forEach(btn => {
        btn.style.display = "none";
    });

    verificarEncerramento();
}

// Verifica encerramento do jogo
function verificarEncerramento() {
    const botaoSortear = document.querySelector(".button-draw");
    const botaoNovoJogo = document.querySelector(".button-new");

    if (amigos.length === 1) {
        document.getElementById("resultado").innerHTML +=
            `<li>Fim de jogo! O último amigo secreto é: <strong>${amigos[0]}</strong></li>`;
        if (responsiveVoice) {
            responsiveVoice.speak(`Fim de jogo! O último amigo secreto é: ${amigos[0]}`, "Brazilian Portuguese Female");
        }
        botaoSortear.disabled = true;
        botaoNovoJogo.style.display = "flex";
    }
}

// Novo jogo
function novoJogo() {
    alert("Novo jogo iniciado!");

    if (responsiveVoice) {
        responsiveVoice.speak("Novo jogo iniciado!", "Brazilian Portuguese Female");
        responsiveVoice.speak("Digite o nome dos seus amigos", "Brazilian Portuguese Female");
    }

    amigos = [];
    atualizarLista();
    document.getElementById("resultado").innerHTML = "";

    const botaoSortear = document.querySelector(".button-draw");
    const botaoAdicionar = document.querySelector(".button-add");
    const input = document.getElementById("amigo");
    const botaoNovoJogo = document.querySelector(".button-new");
    const aviso = document.getElementById("avisoLista");

    botaoSortear.disabled = true;
    botaoAdicionar.disabled = false;
    input.disabled = false;
    botaoNovoJogo.style.display = "none";
    aviso.style.display = "none";

    input.value = "";
    input.focus();
}

// Habilitar sortear apenas com >=2 nomes
function atualizarEstadoSortear() {
    const botaoSortear = document.querySelector(".button-draw");
    botaoSortear.disabled = amigos.length < 2;
}

// Adicionar com Enter
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".button-add").click();
    }
});

// Carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button-draw").disabled = true;
    document.querySelector(".button-new").style.display = "none";

    // Alertas e voz
    alert("Boas-vindas ao Mini gamer do Amigo secreto");
    if (responsiveVoice) {
        responsiveVoice.speak("Boas-vindas ao Mini gamer do Amigo secreto", "Brazilian Portuguese Female");
        responsiveVoice.speak("Digite o nome dos seus amigos", "Brazilian Portuguese Female");
    }
});

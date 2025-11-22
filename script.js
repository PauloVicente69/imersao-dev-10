// Seleciona o elemento HTML com a classe "card-container" e o armazena na variável `cardContainer`.
let cardContainer = document.querySelector(".card-container");
// Seleciona o elemento de input dentro do cabeçalho (header) e o armazena na variável `campoBusca`.
let campoBusca = document.querySelector("header input")
// Declara uma array vazia chamada `dados` que será usada para armazenar os dados carregados.
let dados = [];

// Declara uma função assíncrona chamada `iniciarBusca`.
async function iniciarBusca() {
    // Verifica se a array `dados` está vazia (ou seja, se os dados ainda não foram carregados).
    if (dados.length === 0) {
        // Inicia um bloco try-catch para lidar com possíveis erros durante a busca de dados.
        try {
            // Faz uma requisição assíncrona para o arquivo "data.json" e aguarda a resposta.
            let resposta = await fetch("data.json");
            // Converte a resposta para JSON e a armazena na variável `dados`.
            dados = await resposta.json();     
        } catch (error) {
            // Se ocorrer um erro, exibe uma mensagem de erro no console.
            console.error("Falha ao buscar dados:", error);
            // Interrompe a execução da função se houver um erro.
            return; 
        }
    }
    
    // Obtém o valor atual do campo de busca, converte para minúsculas e armazena em `termoBusca`.
    const termoBusca = campoBusca.value.toLowerCase();
    // Filtra a array `dados` com base no termo de busca, verificando se o nome ou a descrição incluem o termo.
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
        );

    // Chama a função `renderizarCards` para exibir os dados filtrados.
    renderizarCards(dadosFiltrados);
}

// Declara uma função chamada `renderizarCards` que recebe uma array de `dados` como argumento.
function renderizarCards(dados){
    // Limpa o conteúdo HTML do `cardContainer` antes de renderizar novos cards.
    cardContainer.innerHTML = ""; 
    // Itera sobre cada `dado` na array `dados`.
    for (let dado of dados) {
        // Cria um novo elemento HTML <article>.
        let article = document.createElement("article");
        // Adiciona a classe "card" ao elemento <article>.
        article.classList.add("card");
        // Define o conteúdo HTML interno do <article> usando um template literal.
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.data_criacao}</p>
            <p class="descricao">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        // Adiciona o elemento <article> recém-criado como filho do `cardContainer`.
        cardContainer.appendChild(article);
    }
}
let dadosPokemons = [];
let dadosTipos = [];
let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input[type='text']");

// Carrega os dados do JSON assim que o script é executado
async function carregarDados() {
    try {
        const [respostaPokemons, respostaTipos] = await Promise.all([
            fetch("dex.json"),
            fetch("types.json")
        ]);

        dadosPokemons = await respostaPokemons.json();
        dadosTipos = await respostaTipos.json();

        renderizarCards(dadosPokemons); // Exibe todos os Pokémon inicialmente
    } catch (error) {
        console.error("Falha ao carregar dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados da Pokédex. Tente novamente mais tarde.</p>";
    }
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();

    if (termoBusca === "") {
        renderizarCards(dadosPokemons); // Se a busca estiver vazia, mostra todos
        return;
    }

    const resultados = dadosPokemons.filter(pokemon => {
        const nome = pokemon.Nome.toLowerCase();
        const numero = pokemon.Numero.toString();
        // Verifica se algum dos tipos do array inclui o termo de busca
        const tipoEncontrado = pokemon.Tipo.some(tipo => tipo.toLowerCase().includes(termoBusca));

        return nome.includes(termoBusca) || numero.includes(termoBusca) || tipoEncontrado;
    });

    renderizarCards(resultados);
}

function renderizarCards(pokemons) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let pokemon of pokemons) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Cria os spans de tipo dinamicamente
        const tiposHtml = pokemon.Tipo.map(nomeTipo => {
            const tipoInfo = dadosTipos.find(t => t.nome === nomeTipo);
            const cor = tipoInfo ? tipoInfo.cor : '#68A090'; // Uma cor padrão caso o tipo não seja encontrado

            // Cria o span e aplica o estilo de cor diretamente na fonte (color)
            return `<span style="color: ${cor}; font-weight: bold;">${nomeTipo}</span>`;
        }).join(' / '); // Junta os spans com um separador

        article.innerHTML = `
            <h2>#${pokemon.Numero} ${pokemon.Nome}</h2>
            <p><strong class="info-label">Tipo:</strong> ${tiposHtml}</p>
            <p><strong class="info-label">Espécie:</strong> ${pokemon.Especie}</p>
            <p><strong class="label-firered">FireRed:</strong> ${pokemon["Descricao FR"]}</p>
            <p><strong class="label-leafgreen">LeafGreen:</strong> ${pokemon["Descricao LG"]}</p>
        `
        cardContainer.appendChild(article);
    }
}

// Inicia o carregamento dos dados quando a página é carregada
carregarDados();

// Adiciona um event listener para a tecla "Enter" no campo de busca
inputBusca.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

let filmes = [
    { titulo: "Homem-Aranha: Um Novo Dia", ano: 2026, genero: ["Ação","Ficção","Aventura"], nota: 8.0, poster: "assets/homemaranha.webp", link="https://www.primevideo.com/-/pt/detail/0MH84EJKE2M4I598UISANJRS1X" },
    { titulo: "Matrix", ano: 1999, genero: ["Ação","Suspense","Ficção"], nota: 8.7, poster: "assets/matrix.webp", link="https://www.primevideo.com/-/pt/detail/0SC64NC24QA7M9AFWBEK87WWS0/" },
    { titulo: "Viva: A Vida é uma Festa", ano: 2017, genero: ["Aventura","Animação","Fantasia","Comédia"], nota: 7.4, poster: "assets/viva.jpeg", link="https://www.disneyplus.com/pt-br/browse/entity-ce1ccdca-f468-4960-b67c-026b01ba42ab" },
    { titulo: "Como Treinar o Seu Dragão", ano: 2010, genero: ["Animação","Ação","Aventura"], nota: 7.3, poster: "assets/comotreinarseudragao.jpg", link="https://www.primevideo.com/-/pt/detail/0M6IL90MHWOVU4BTTNA1WM06Z1/" },
    { titulo: "Vingadores: Ultimato", ano: 2019, genero: ["Ficção","Ação","Aventura"], nota: 8.4, poster: "assets/ultimato.jpeg", link="https://www.disneyplus.com/pt-br/browse/entity-b39aa962-be56-4b09-a536-98617031717f" },
    { titulo: "Corra!", ano: 2017, genero: ["Terror","Suspense Psicológico"], nota: 7.8, poster: "assets/corrafilme.jpeg", link="https://www.primevideo.com/-/pt/detail/0I9VQV8TPDEL2MLX080A1JKN6X/" },
    { titulo: "Ilha do Medo", ano: 2010, genero: ["Suspense Psicológico","Mistério","Thriller"], nota: 7.2, poster: "assets/ilhadomedo.jpeg", link="https://www.primevideo.com/-/pt/detail/0INICTQA9DNNLBC8H72QO0J3NZ" },
    { titulo: "Oppenheimer", ano: 2023, genero: ["Suspense","História","Drama"], nota: 8.3, poster: "assets/oppenheimer.jpeg", link="https://www.primevideo.com/-/pt/detail/0TQ0HYSFFKAO9W3UUIOMSTPUJ7/" },
];

function mostrarFilmes(lista) {
  const secao = document.getElementById("catalogo");

  // se a lista veio vazia, mostra a mensagem na própria página
  if (lista.length === 0) {
    secao.innerHTML = '<p class="sem-resultado">Nenhum filme encontrado</p>';
    document.getElementById("contador").innerText = 0;
    return;
  }

  let html = "";

  for (const filme of lista) {
    const indice = filmes.indexOf(filme);
    const selo = filme.nota >= 8 ? '<span class="selo">⭐ Recomendado</span>' : "";
    const nota = filme.nota !== null ? filme.nota.toFixed(1).replace(".", ",") : "—";

    let generos = "";
    for (const g of filme.genero) {
      generos += "<li>" + g + "</li>";
    }

    html += `
      <div class="catalogo-card">
        <img src="${filme.poster}" alt="Pôster de ${filme.titulo}" loading="lazy">
        ${selo}
        <h3><a href="${filme.link}" target="_blank" rel="noopener noreferrer">${filme.titulo}</a></h3>
        <p class="catalogo-detalhes">${filme.ano} · Nota ${nota}</p>
        <ul class="catalogo-generos">${generos}</ul>
        <button class="btn-favoritar" onclick="favoritar(${indice})">♥ Favoritar</button>
      </div>
    `;
  }

  secao.innerHTML = html;
  document.getElementById("contador").innerText = lista.length;
}

// busca por título + filtro por gênero
const campoBusca = document.getElementById("busca");
const filtroGenero = document.getElementById("filtro-genero");

function limpar(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function aplicarFiltros() {
  const genero = filtroGenero.value;
  const encontrados = [];

  for (const filme of filmes) {
    const achouTitulo = limpar(filme.titulo).includes(limpar(campoBusca.value));

    let achouGenero;
    if (genero === "todos") {
      achouGenero = true;
    } else {
      achouGenero = filme.genero.includes(genero);
    }

    if (achouTitulo && achouGenero) {
      encontrados.push(filme);
    }
  }

  mostrarFilmes(encontrados);
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroGenero.addEventListener("change", aplicarFiltros);


campoBusca.addEventListener("input", aplicarFiltros);
filtroGenero.addEventListener("change", aplicarFiltros);

const botaoInverter = document.getElementById("btn-inverter");

botaoInverter.addEventListener("click", function () {
  filmes.reverse();      // inverte a ordem do array
  aplicarFiltros();      // mostra o catálogo de novo, respeitando busca e filtro
});

let favoritos = [];

function favoritar(indice) {
  const titulo = filmes[indice].titulo;

  // só adiciona se o título ainda não estiver na lista
  if (!favoritos.includes(titulo)) {
    favoritos.push(titulo);
  }

  mostrarFavoritos();
}

function mostrarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  let html = "";

  if (favoritos.length === 0) {
    html = "<li>Nenhum filme favoritado ainda</li>";
  } else {
    for (const titulo of favoritos) {
      html += "<li>" + titulo + "</li>";
    }
  }

  lista.innerHTML = html;
  document.getElementById("contador-favoritos").innerText = favoritos.length;
}

const botaoLimpar = document.getElementById("btn-limpar");

botaoLimpar.addEventListener("click", function () {
  favoritos = [];          // esvazia o array
  mostrarFavoritos();      // atualiza a página
});

mostrarFavoritos();        

// interação com o mouse nos títulos
const tituloCatalogo = document.querySelector(".catalogo-titulo");
const tituloDestaque = document.querySelector(".destaque-titulo");

function destacarTitulo(elemento) {
  elemento.addEventListener("mouseenter", function () {
    elemento.style.color = "#A855F7";               
    elemento.style.backgroundColor = "#1B2437";     
  });

  elemento.addEventListener("mouseout", function () {
    elemento.style.color = "#F1F5F9";               
    elemento.style.backgroundColor = "transparent"; 
  });
}

destacarTitulo(tituloCatalogo);
destacarTitulo(tituloDestaque);

mostrarFilmes(filmes);
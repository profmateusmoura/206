// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM carregado - script funcionando");
    
    // Carregamento de Páginas Dinâmicas com Links do Menu
    const links = document.querySelectorAll(".menu a[data-page]");
    const content = document.getElementById("main-content");
    
    console.log("Links encontrados:", links.length);
    console.log("Content encontrado:", content);

    // Função para carregar o conteúdo das views
    function loadPage(page) {
        console.log("Carregando página:", page);
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar a página");
                }
                return response.text();
            })
            .then(data => {
                content.innerHTML = data; // Insere o conteúdo no main
                console.log("Página carregada com sucesso");
            })
            .catch(error => {
                content.innerHTML = "<h2>Erro ao carregar a página</h2><p>Por favor, tente novamente mais tarde.</p>";
                console.error('Erro ao carregar a página: ', error);
            });
    }

    // Adiciona evento de clique aos links do menu
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a navegação normal
            const page = this.getAttribute("data-page");
            console.log("Link clicado:", page);

            if (page) {
                loadPage(page); // Carrega o conteúdo da página selecionada
            } else {
                console.error('Atributo data-page não definido corretamente.');
            }
        });
    });
});

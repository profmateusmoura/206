// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
    // Carregamento de Páginas Dinâmicas com Links do Menu
    const links = document.querySelectorAll(".menu a[data-page]");
    const content = document.getElementById("main-content");

    // Função para carregar o conteúdo das views
    function loadPage(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar a página");
                }
                return response.text();
            })
            .then(data => {
                content.innerHTML = data; // Insere o conteúdo no main
            })
            .catch(error => {
                content.innerHTML = "<h2>Erro ao carregar a página</h2><p>Por favor, tente novamente mais tarde.</p>";
                console.error('Erro ao carregar a página: ', error); // Log do erro para o console
            });
    }

    // Adiciona evento de clique aos links do menu
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a navegação normal
            const page = this.getAttribute("data-page");

            if (page) {
                loadPage(page); // Carrega o conteúdo da página selecionada
            } else {
                console.error('Atributo data-page não definido corretamente.');
            }
        });
    });

    // Manipulação de Título
    const alterarTituloBtn = document.getElementById("alterarTitulo");
    if (alterarTituloBtn) {
        alterarTituloBtn.addEventListener("click", function () {
            const titulo = document.getElementById("tituloPrincipal");
            if (titulo) {
                titulo.textContent = "Título Modificado com Sucesso!";
            }
        });
    }

    // Manipulação de Imagem
    const alterarImagemBtn = document.getElementById("alterarImagem");
    if (alterarImagemBtn) {
        alterarImagemBtn.addEventListener("click", function () {
            const imagem = document.getElementById("minhaImagem");
            if (imagem) {
                imagem.src = "./img/2.png";
            }
        });
    }

    const alterarEstiloImagemBtn = document.getElementById("alterarEstiloImagem");
    if (alterarEstiloImagemBtn) {
        alterarEstiloImagemBtn.addEventListener("click", function () {
            const imagem = document.getElementById("minhaImagem");
            if (imagem) {
                imagem.style.borderRadius = "50%";
                imagem.style.boxShadow = "0px 0px 10px #000";
            }
        });
    }

    // Manipulação de Botão
    const botaoEstilizado = document.getElementById("botaoEstilizado");
    if (botaoEstilizado) {
        botaoEstilizado.addEventListener("click", function () {
            botaoEstilizado.style.backgroundColor = "#28a745";
            botaoEstilizado.style.color = "#fff";
            botaoEstilizado.textContent = "Clicado!";
        });
    }

    // Manipulação de Input
    const capturarInputBtn = document.getElementById("capturarInput");
    if (capturarInputBtn) {
        capturarInputBtn.addEventListener("click", function () {
            const nome = document.getElementById("meuInput");
            if (nome) {
                alert("Nome digitado: " + nome.value);
            }
        });
    }

    // Manipulação de Link
    const alterarLinkBtn = document.getElementById("alterarLink");
    if (alterarLinkBtn) {
        alterarLinkBtn.addEventListener("click", function () {
            const link = document.getElementById("meuLink");
            if (link) {
                link.href = "https://etmsl.setelagoas.mg.gov.br";
                link.textContent = "Visite o ETMSL";
            }
        });
    }

    // Manipulação de Lista
    const adicionarItemListaBtn = document.getElementById("adicionarItemLista");
    if (adicionarItemListaBtn) {
        adicionarItemListaBtn.addEventListener("click", function () {
            const lista = document.getElementById("minhaLista");
            if (lista) {
                const novoItem = document.createElement("li");
                novoItem.textContent = "Novo Item";
                lista.appendChild(novoItem);
            }
        });
    }

    // Manipulação de Div
    const alterarDivBtn = document.getElementById("alterarDiv");
    if (alterarDivBtn) {
        alterarDivBtn.addEventListener("click", function () {
            const div = document.getElementById("divPrincipal");
            if (div) {
                div.textContent = "O conteúdo da div foi alterado!";
                div.classList.add("highlight");
            }
        });
    }
});

    // Validação de Email
    function validarEmail() {
        const emailInput = document.getElementById('email').value;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(emailInput)) {
            alert('Email válido!');
        } else {
            alert('Email inválido!');
        }
    }

    // Validação de CEP
    function validarCEP() {
        const cepInput = document.getElementById('cep').value;
        const regex = /^\d{5}-\d{3}$/;
        if (regex.test(cepInput)) {
            alert('CEP válido!');
        } else {
            alert('CEP inválido!');
        }
    }

    // Substituição de Espaços por Hífens
    function substituirEspacos() {
        const textoInput = document.getElementById('texto').value;
        const resultado = textoInput.replace(/\s/g, '-');
        alert('Texto modificado: ' + resultado);
    }

    // Validação de Número de Telefone
    function validarTelefone() {
        const telefoneInput = document.getElementById('telefone').value;
        const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (regex.test(telefoneInput)) {
            alert('Telefone válido!');
        } else {
            alert('Telefone inválido!');
        }
    }

    // Validação de Data
    function validarData() {
        const dataInput = document.getElementById('data').value;
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (regex.test(dataInput)) {
            alert('Data válida!');
        } else {
            alert('Data inválida!');
        }
    }

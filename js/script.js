// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
    // Carregamento de Páginas Dinâmicas com Links do Menu
    const links = document.querySelectorAll(".menu a[data-page]");
    const content = document.getElementById("main-content");

    // Função para carregar o conteúdo das views
    function loadPage(page) {
        console.log('Tentando carregar página:', page);
        fetch(page)
            .then(response => {
                console.log('Resposta recebida para', page, '- Status:', response.status);
                if (!response.ok) {
                    throw new Error("Erro ao carregar a página - Status: " + response.status);
                }
                return response.text();
            })
            .then(data => {
                console.log('Dados recebidos para', page, '- Tamanho:', data.length);
                content.innerHTML = data;
                console.log('Página carregada com sucesso:', page);
            })
            .catch(error => {
                console.error('ERRO ao carregar página:', page, '- Erro:', error);
                content.innerHTML = "<h2>Erro ao carregar a página</h2><p>Erro: " + error.message + "</p><p>Página: " + page + "</p>";
            });
    }

    // Adiciona evento de clique aos links do menu
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");

            if (page) {
                loadPage(page);
            } else {
                console.error('Atributo data-page não definido corretamente.');
            }
        });
    });
});

// Variável para armazenar o histórico de buscas
let historicoBuscas = JSON.parse(localStorage.getItem('historicoCEP')) || [];

// Função principal para buscar CEP (versão tutorial)
async function testarBuscaCEP() {
    const cep = document.getElementById('cep-input').value;
    const resultDiv = document.getElementById('cep-result');
    
    if (!resultDiv) return; // Se não estiver na página de API, sair
    
    // Limpar resultado anterior
    resultDiv.style.display = 'block';
    resultDiv.className = 'result-box';
    resultDiv.innerHTML = '<div class="loading">🔍 Buscando CEP...</div>';
    
    try {
        const data = await buscarCEPAPI(cep);
        
        resultDiv.innerHTML = `
            <h4>✅ CEP Encontrado!</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                <div><strong>CEP:</strong> ${data.cep}</div>
                <div><strong>DDD:</strong> ${data.ddd}</div>
                <div><strong>Logradouro:</strong> ${data.logradouro}</div>
                <div><strong>Bairro:</strong> ${data.bairro}</div>
                <div><strong>Cidade:</strong> ${data.localidade}</div>
                <div><strong>UF:</strong> ${data.uf}</div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 4px;">
                <strong>💡 Endereço Completo:</strong><br>
                ${data.logradouro}, ${data.bairro}<br>
                ${data.localidade} - ${data.uf}, ${data.cep}
            </div>
        `;
        
    } catch (error) {
        resultDiv.className = 'error-box';
        resultDiv.innerHTML = `❌ ${error.message}`;
    }
}

// Função utilitária para consumir a API ViaCEP
async function buscarCEPAPI(cep) {
    // 1. Validação e limpeza do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
        throw new Error('CEP deve ter exatamente 8 dígitos');
    }
    
    // 2. Fazer a requisição
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
        throw new Error('Erro na conexão com a API');
    }
    
    const data = await response.json();
    
    // 3. Verificar se o CEP existe
    if (data.erro) {
        throw new Error('CEP não encontrado na base de dados');
    }
    
    return data;
}

// Função para preencher formulário automaticamente
async function preencherEndereco() {
    const cep = document.getElementById('form-cep');
    if (!cep) return; // Se não estiver na página de API, sair
    
    const cepValue = cep.value;
    
    if (!cepValue || cepValue.length < 8) return;
    
    try {
        const data = await buscarCEPAPI(cepValue);
        
        // Preencher os campos
        const logradouro = document.getElementById('form-logradouro');
        const bairro = document.getElementById('form-bairro');
        const cidade = document.getElementById('form-cidade');
        const uf = document.getElementById('form-uf');
        const numero = document.getElementById('form-numero');
        
        if (logradouro) logradouro.value = data.logradouro || '';
        if (bairro) bairro.value = data.bairro || '';
        if (cidade) cidade.value = data.localidade || '';
        if (uf) uf.value = data.uf || '';
        
        // Focar no campo número
        if (numero) numero.focus();
        
    } catch (error) {
        alert(`Erro ao buscar CEP: ${error.message}`);
        limparFormulario();
    }
}

// Função para limpar o formulário
function limparFormulario() {
    const campos = ['form-cep', 'form-logradouro', 'form-bairro', 'form-cidade', 'form-uf', 'form-numero'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = '';
    });
}

// Função para buscar por endereço (cidade + logradouro)
async function buscarPorEndereco() {
    const uf = document.getElementById('uf-select');
    const cidade = document.getElementById('cidade-input');
    const logradouro = document.getElementById('logradouro-input');
    const resultDiv = document.getElementById('endereco-result');
    
    if (!resultDiv) return; // Se não estiver na página de API, sair
    
    if (!uf.value || !cidade.value.trim() || !logradouro.value.trim()) {
        alert('Preencha todos os campos: UF, Cidade e Logradouro');
        return;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.className = 'result-box';
    resultDiv.innerHTML = '<div class="loading">🏠 Buscando endereços...</div>';
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf.value}/${encodeURIComponent(cidade.value)}/${encodeURIComponent(logradouro.value)}/json/`);
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.className = 'error-box';
            resultDiv.innerHTML = '❌ Nenhum endereço encontrado';
            return;
        }
        
        // Exibir até 5 resultados
        const resultados = data.slice(0, 5);
        let html = `<h4>📍 ${resultados.length} endereço(s) encontrado(s):</h4>`;
        
        resultados.forEach((endereco, index) => {
            html += `
                <div style="padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;">
                    <strong>${index + 1}. ${endereco.logradouro}</strong><br>
                    ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}<br>
                    <span style="color: #666;">CEP: ${endereco.cep}</span>
                </div>
            `;
        });
        
        resultDiv.innerHTML = html;
        
    } catch (error) {
        resultDiv.className = 'error-box';
        resultDiv.innerHTML = `❌ Erro na busca: ${error.message}`;
    }
}

// Função do localizador completo com histórico
async function buscarCompleto() {
    const cep = document.getElementById('localizador-cep');
    const resultDiv = document.getElementById('localizador-result');
    
    if (!cep || !resultDiv) return; // Se não estiver na página de API, sair
    
    if (!cep.value.trim()) {
        alert('Digite um CEP para buscar');
        return;
    }
    
    resultDiv.innerHTML = '<div class="loading">🔍 Localizando...</div>';
    
    try {
        const data = await buscarCEPAPI(cep.value);
        
        // Adicionar ao histórico
        const busca = {
            cep: data.cep,
            endereco: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`,
            data: new Date().toLocaleString('pt-BR')
        };
        
        historicoBuscas.unshift(busca);
        if (historicoBuscas.length > 10) {
            historicoBuscas = historicoBuscas.slice(0, 10); // Manter apenas 10
        }
        
        // Salvar no localStorage
        localStorage.setItem('historicoCEP', JSON.stringify(historicoBuscas));
        
        // Exibir resultado
        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 10px 0;">
                <h3 style="margin: 0 0 15px 0; color: white;">📍 ${data.localidade} - ${data.uf}</h3>
                <div style="font-size: 18px; margin-bottom: 15px;">
                    <strong>${data.logradouro}</strong><br>
                    ${data.bairro} • CEP: ${data.cep}
                </div>
                <div style="display: flex; gap: 20px; font-size: 14px; opacity: 0.9;">
                    <span>📞 DDD: ${data.ddd}</span>
                    <span>🏛️ IBGE: ${data.ibge}</span>
                </div>
            </div>
        `;
        
        // Atualizar histórico
        atualizarHistorico();
        
        // Limpar campo
        cep.value = '';
        
    } catch (error) {
        resultDiv.innerHTML = `<div class="error-box">❌ ${error.message}</div>`;
    }
}

// Função para atualizar a exibição do histórico
function atualizarHistorico() {
    const historicoDiv = document.getElementById('historico');
    
    if (!historicoDiv) return; // Se não estiver na página de API, sair
    
    if (historicoBuscas.length === 0) {
        historicoDiv.innerHTML = '<em>Nenhuma busca realizada ainda...</em>';
        return;
    }
    
    let html = '';
    historicoBuscas.forEach((busca, index) => {
        html += `
            <div style="padding: 8px; margin: 5px 0; border-left: 3px solid #007bff; background: #f8f9fa;">
                <strong>${busca.cep}</strong> - ${busca.endereco}<br>
                <small style="color: #666;">${busca.data}</small>
            </div>
        `;
    });
    
    historicoDiv.innerHTML = html;
}

// Função para limpar histórico
function limparHistorico() {
    if (confirm('Tem certeza que deseja limpar o histórico?')) {
        historicoBuscas = [];
        localStorage.removeItem('historicoCEP');
        atualizarHistorico();
    }
}

// Função para inicializar as funcionalidades da API quando a página carregar
function inicializarAPI() {
    // Carregar histórico na inicialização
    atualizarHistorico();
    
    // Formatação automática de CEP
    const cepInputs = document.querySelectorAll('input[type="text"][id*="cep"]');
    cepInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    });
    
    // Adicionar evento onblur para o campo form-cep
    const formCep = document.getElementById('form-cep');
    if (formCep) {
        formCep.addEventListener('blur', preencherEndereco);
    }
}

// Observer para detectar quando a página de API é carregada
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // Verificar se elementos da API foram adicionados
            if (document.getElementById('cep-input') || document.getElementById('form-cep')) {
                setTimeout(inicializarAPI, 100); // Pequeno delay para garantir que todos os elementos foram carregados
            }
        }
    });
});

// Iniciar observação do conteúdo principal
const mainContent = document.getElementById('main-content');
if (mainContent) {
    observer.observe(mainContent, { childList: true, subtree: true });
}

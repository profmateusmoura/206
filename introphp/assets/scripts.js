/**
 * Função para gerar a música "N Patinhos Foram Passear"
 * @param {number} quantidade - Número inicial de patinhos
 * @param {number} atraso - Atraso em segundos entre cada estrofe
 */
function tocarMusicaPatinhos(quantidade, atraso) {
    const container = document.getElementById('musica-container');
    let patinhosRestantes = quantidade;
    let estrofeAtual = 0;
    
    // Limpar o container antes de começar
    container.innerHTML = '<div class="loading">Carregando música...</div>';
    
    // Converter atraso para milissegundos
    const atrasoMs = atraso * 1000;
    
    // Função para criar uma estrofe para n patinhos
    function criarEstrofe(n) {
        let estrofe = document.createElement('div');
        estrofe.className = 'estrofe';
        
        if (n > 1) {
            estrofe.innerHTML = `
                <p class="verso">${n} patinhos foram passear</p>
                <p class="verso">Além das montanhas para brincar</p>
                <p class="verso">A mamãe gritou: Quá, quá, quá, quá!</p>
                <p class="verso">Mas só ${n-1} patinhos voltaram de lá.</p>
            `;
        } else if (n === 1) {
            estrofe.innerHTML = `
                <p class="verso">1 patinho foi passear</p>
                <p class="verso">Além das montanhas para brincar</p>
                <p class="verso">A mamãe gritou: Quá, quá, quá, quá!</p>
                <p class="verso">Mas nenhum patinho voltou de lá.</p>
            `;
        } else {
            // Estrofe final
            estrofe.innerHTML = `
                <p class="verso">A mamãe patinha foi procurar</p>
                <p class="verso">Além das montanhas, na beira do mar</p>
                <p class="verso">A mamãe gritou: Quá, quá, quá, quá!</p>
                <p class="verso">E os ${quantidade} patinhos voltaram de lá.</p>
            `;
        }
        
        return estrofe;
    }
    
    // Função para mostrar a próxima estrofe
    function mostrarProximaEstrofe() {
        // Remover a mensagem de carregamento na primeira execução
        if (estrofeAtual === 0) {
            container.innerHTML = '';
        }
        
        // Criar e adicionar a estrofe atual
        const estrofe = criarEstrofe(patinhosRestantes);
        
        // Adicionar classe para animar a entrada da estrofe
        estrofe.classList.add('fade-in');
        
        // Adicionar ao container
        container.appendChild(estrofe);
        
        // Rolar para a última estrofe
        estrofe.scrollIntoView({ behavior: 'smooth' });
        
        // Preparar para a próxima estrofe
        estrofeAtual++;
        patinhosRestantes--;
        
        // Se ainda temos estrofes para mostrar, continuar após o atraso
        if (estrofeAtual <= quantidade) {
            setTimeout(mostrarProximaEstrofe, atrasoMs);
        }
    }
    
    // Iniciar a música após um pequeno atraso inicial
    setTimeout(mostrarProximaEstrofe, 500);
}
<?php
$title = "Verificador de Eleitor";
$h1 = "Verificador de Eleitor";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_GET['nome']) && isset($_GET['idade']) && isset($_GET['email'])) {
    // Obter os valores
    $nome = htmlspecialchars($_GET['nome']);
    $idade = intval($_GET['idade']);
    $email = htmlspecialchars($_GET['email']);

    // Determinar a situação do eleitor
    if ($idade < 16) {
        $status = "nao-eleitor";
        $statusTexto = "Não Eleitor";
        $descricao = "Você ainda não tem idade para votar.";
    } elseif (($idade >= 16 && $idade < 18) || $idade > 70) {
        $status = "facultativo";
        $statusTexto = "Voto Facultativo";
        $descricao = "Você pode votar, mas não é obrigado.";
    } else {
        $status = "obrigatorio";
        $statusTexto = "Voto Obrigatório";
        $descricao = "Você é obrigado a votar nas eleições.";
    }
    
    // Exibir resultados
    echo '<div class="resultado">';
    echo '<div class="info">';
    echo '<div class="campo"><strong>Nome:</strong> ' . $nome . '</div>';
    echo '<div class="campo"><strong>Idade:</strong> ' . $idade . ' anos</div>';
    echo '<div class="campo"><strong>E-mail:</strong> ' . $email . '</div>';
    echo '</div>';
    
    echo '<div class="status ' . $status . '">';
    echo $statusTexto . '<br>';
    echo '<span style="font-size: 0.8rem; font-weight: normal;">' . $descricao . '</span>';
    echo '</div>';
    echo '</div>';
    
    echo '<div class="botoes">';
    echo '<a href="eleitor.php" class="botao">Nova Consulta</a>';
    echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
    echo '</div>';
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="get">
    <div class="form-group">
        <label for="nome">Nome completo:</label>
        <input type="text" id="n" name="nome" required>
    </div>
    
    <div class="form-group">
        <label for="idade">Idade:</label>
        <input type="number" id="i" name="idade" min="0" max="120" required>
    </div>
    
    <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="e" name="email" required>
    </div>
    
    <button type="submit">Verificar</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
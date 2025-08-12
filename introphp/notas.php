<?php
$title = "Verificador de Notas";
$h1 = "Verificador de Notas";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_POST['aluno']) && isset($_POST['nota1']) && isset($_POST['nota2']) && isset($_POST['nota3'])) {
    // Obter os valores
    $aluno = htmlspecialchars($_POST['aluno']);
    $nota1 = floatval($_POST['nota1']);
    $nota2 = floatval($_POST['nota2']);
    $nota3 = floatval($_POST['nota3']);
    
    // Calcular a média
    $media = ($nota1 + $nota2 + $nota3);
    
    // Determinar a situação do aluno
    if ($media < 30) {
        $status = "reprovado";
        $situacao = "Reprovado";
    } elseif ($media >= 30 && $media < 60   ) {
        $status = "estudos-orientados";
        $situacao = "Estudos Orientados";
    } else {
        $status = "aprovado";
        $situacao = "Aprovado";
    }
    
    // Exibir resultados
    echo '<div class="resultado">';
    echo '<div class="info">';
    echo '<h2>Aluno: ' . $aluno . '</h2>';
    echo '</div>';
    
    echo '<div class="notas">';
    echo '<div class="nota">';
    echo '<h3>Nota 1</h3>';
    echo '<div class="nota-valor">' . number_format($nota1, 1, ',', '.') . '</div>';
    echo '</div>';
    
    echo '<div class="nota">';
    echo '<h3>Nota 2</h3>';
    echo '<div class="nota-valor">' . number_format($nota2, 1, ',', '.') . '</div>';
    echo '</div>';
    
    echo '<div class="nota">';
    echo '<h3>Nota 3</h3>';
    echo '<div class="nota-valor">' . number_format($nota3, 1, ',', '.') . '</div>';
    echo '</div>';
    echo '</div>';
    
    echo '<div class="media">Média: ' . number_format($media, 1, ',', '.') . '</div>';
    
    echo '<div class="situacao ' . $status . '">' . $situacao . '</div>';
    echo '</div>';
    
    echo '<div class="botoes">';
    echo '<a href="notas.php" class="botao">Nova Verificação</a>';
    echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
    echo '</div>';
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <div class="form-group">
        <label for="aluno">Nome do Aluno:</label>
        <input type="text" id="aluno" name="aluno" required>
    </div>
    
    <div class="form-group">
        <label for="nota1">Primeira Nota:</label>
        <input type="number" id="nota1" name="nota1" min="0" max="36" step="0.1" required>
        <div class="nota-info">Nota de 0 a 36</div>
    </div>
    
    <div class="form-group">
        <label for="nota2">Segunda Nota:</label>
        <input type="number" id="nota2" name="nota2" min="0" max="36" step="0.1" required>
        <div class="nota-info">Nota de 0 a 36</div>
    </div>
    
    <div class="form-group">
        <label for="nota3">Terceira Nota:</label>
        <input type="number" id="nota3" name="nota3" min="0" max="28" step="0.1" required>
        <div class="nota-info">Nota de 0 a 28</div>
    </div>
    
    <button type="submit">Verificar Situação</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
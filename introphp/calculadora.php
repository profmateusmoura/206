<?php
$title = "Calculadora Completa";
$h1 = "Calculadora Completa";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_POST['numero1']) && isset($_POST['numero2'])) {
    // Obter os valores
    $numero1 = floatval($_POST['numero1']);
    $numero2 = floatval($_POST['numero2']);
    
    // Calcular as operações
    $soma = $numero1 + $numero2;
    $subtracao = $numero1 - $numero2;
    $multiplicacao = $numero1 * $numero2;
    
    // Verificar divisão por zero
    if ($numero2 != 0) {
        $divisao = $numero1 / $numero2;
        $divisaoErro = false;
    } else {
        $divisaoErro = true;
    }
    
    // Exibir resultados
    echo '<div class="resultado">';
    echo '<div class="operacao">';
    echo '<h2>Soma</h2>';
    echo '<div class="valor">' . number_format($soma, 2, ',', '.') . '</div>';
    echo '</div>';
    
    echo '<div class="operacao">';
    echo '<h2>Subtração</h2>';
    echo '<div class="valor">' . number_format($subtracao, 2, ',', '.') . '</div>';
    echo '</div>';
    
    echo '<div class="operacao">';
    echo '<h2>Multiplicação</h2>';
    echo '<div class="valor">' . number_format($multiplicacao, 2, ',', '.') . '</div>';
    echo '</div>';
    
    echo '<div class="operacao">';
    echo '<h2>Divisão</h2>';
    if (!$divisaoErro) {
        echo '<div class="valor">' . number_format($divisao, 2, ',', '.') . '</div>';
    } else {
        echo '<div class="valor" style="color: red;">Não é possível dividir por zero</div>';
    }
    echo '</div>';
    echo '</div>';
    
    echo '<div class="botoes">';
    echo '<a href="calculadora.php" class="botao">Novo Calculo</a>';
    echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
    echo '</div>';
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <div class="form-group">
        <label for="numero1">Primeiro número:</label>
        <input type="number" id="numero1" name="numero1" step="any" required>
    </div>
    
    <div class="form-group">
        <label for="numero2">Segundo número:</label>
        <input type="number" id="numero2" name="numero2" step="any" required>
    </div>
    
    <button type="submit">Calcular</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
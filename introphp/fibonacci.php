<?php
$title = "Sequência de Fibonacci";
$h1 = "Sequência de Fibonacci";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_POST['termos'])) {
    // Obter o número de termos
    $termos = intval($_POST['termos']);
    
    // Validar entrada
    if ($termos < 1) {
        echo '<div class="resultado" style="color: red;">Erro: O número de termos deve ser pelo menos 1.</div>';
    } elseif ($termos > 100) {
        echo '<div class="resultado" style="color: red;">Erro: O número máximo de termos é 100.</div>';
    } else {
        // Calcular a sequência de Fibonacci
        $fibonacci = [];
        
        if ($termos >= 1) {
            $fibonacci[] = 0;
        }
        
        if ($termos >= 2) {
            $fibonacci[] = 1;
        }
        
        for ($i = 2; $i < $termos; $i++) {
            $fibonacci[] = $fibonacci[$i-1] + $fibonacci[$i-2];
        }
        
        // Exibir resultados
        echo '<div class="resultado">';
        echo '<div class="info">';
        echo '<h2>Sequência de Fibonacci com ' . $termos . ' termo' . ($termos > 1 ? 's' : '') . ':</h2>';
        echo '</div>';
        
        echo '<div class="sequencia">';
        foreach ($fibonacci as $index => $numero) {
            echo '<div class="numero" title="Termo ' . ($index + 1) . '">' . $numero . '</div>';
        }
        echo '</div>';
        echo '</div>';
        
        echo '<div class="botoes">';
        echo '<a href="fibonacci.php" class="botao">Nova Sequência</a>';
        echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
        echo '</div>';
    }
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <div class="form-group">
        <label for="termos">Número de termos:</label>
        <input type="number" id="termos" name="termos" min="1" max="100" required>
        <div class="info">Insira um número entre 1 e 100</div>
    </div>
    
    <button type="submit">Gerar Sequência</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
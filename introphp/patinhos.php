<?php
$title = "Música dos Patinhos";
$h1 = "Música dos Patinhos";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_POST['quantidade']) && isset($_POST['atraso'])) {
    $quantidade = intval($_POST['quantidade']);
    $atraso = intval($_POST['atraso']);
    
    // Validação básica
    if ($quantidade <= 0 || $quantidade > 20) {
        echo '<div class="resultado" style="color: red;">Por favor, insira um número de patinhos entre 1 e 20.</div>';
    } elseif ($atraso < 1 || $atraso > 10) {
        echo '<div class="resultado" style="color: red;">O atraso deve estar entre 1 e 10 segundos.</div>';
    } else {
        // Mostrar a área onde a música será exibida
        echo '<div class="resultado">';
        echo '<h2>Música dos ' . $quantidade . ' Patinhos</h2>';
        echo '<div id="musica-container" class="musica-container"></div>';
        echo '</div>';
        
        // Botões de navegação
        echo '<div class="botoes">';
        echo '<a href="patinhos.php" class="botao">Nova Música</a>';
        echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
        echo '</div>';
        
        // Incluir o script JS e passar os parâmetros
        echo '<script src="assets/scripts.js"></script>';
        echo '<script>';
        echo 'document.addEventListener("DOMContentLoaded", function() {';
        echo '    tocarMusicaPatinhos(' . $quantidade . ', ' . $atraso . ');';
        echo '});';
        echo '</script>';
    }
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <div class="form-group">
        <label for="quantidade">Número de patinhos:</label>
        <input type="number" id="quantidade" name="quantidade" min="1" max="20" value="5" required>
        <div class="info">Insira um número entre 1 e 20</div>
    </div>
    
    <div class="form-group">
        <label for="atraso">Atraso entre estrofes (segundos):</label>
        <input type="number" id="atraso" name="atraso" min="1" max="10" value="3" required>
        <div class="info">Insira um número entre 1 e 10 segundos</div>
    </div>
    
    <button type="submit">Gerar Música</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
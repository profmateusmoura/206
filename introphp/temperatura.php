<?php
$title = "Conversor de Temperatura";
$h1 = "Conversor de Temperatura";
include './partials/header.php';

// Processar o formulário quando enviado
if (isset($_POST['temperatura']) && isset($_POST['escala'])) {
    // Obter os valores
    $temperatura = floatval($_POST['temperatura']);
    $escala = $_POST['escala'];
    
    // Converter para todas as escalas
    switch ($escala) {
        case 'celsius':
            $celsius = $temperatura;
            $fahrenheit = ($celsius * 9/5) + 32;
            $kelvin = $celsius + 273.15;
            $escalaOriginal = "Celsius (°C)";
            $simboloOriginal = "°C";
            break;
            
        case 'fahrenheit':
            $fahrenheit = $temperatura;
            $celsius = ($fahrenheit - 32) * 5/9;
            $kelvin = $celsius + 273.15;
            $escalaOriginal = "Fahrenheit (°F)";
            $simboloOriginal = "°F";
            break;
            
        case 'kelvin':
            $kelvin = $temperatura;
            $celsius = $kelvin - 273.15;
            $fahrenheit = ($celsius * 9/5) + 32;
            $escalaOriginal = "Kelvin (K)";
            $simboloOriginal = "K";
            break;
            
        default:
            echo '<div class="resultado" style="color: red;">Erro: Escala inválida.</div>';
            exit;
    }
    
    // Exibir resultados
    echo '<div class="resultado">';
    echo '<div class="original">Temperatura original: <strong>' . $temperatura . ' ' . $simboloOriginal . '</strong> (' . $escalaOriginal . ')</div>';
    
    // Exibir conversões (exceto a original)
    if ($escala != 'celsius') {
        echo '<div class="conversao">';
        echo '<h2>Celsius (°C)</h2>';
        echo '<div class="valor">' . number_format($celsius, 2, ',', '.') . ' °C</div>';
        echo '</div>';
    }
    
    if ($escala != 'fahrenheit') {
        echo '<div class="conversao">';
        echo '<h2>Fahrenheit (°F)</h2>';
        echo '<div class="valor">' . number_format($fahrenheit, 2, ',', '.') . ' °F</div>';
        echo '</div>';
    }
    
    if ($escala != 'kelvin') {
        echo '<div class="conversao">';
        echo '<h2>Kelvin (K)</h2>';
        echo '<div class="valor">' . number_format($kelvin, 2, ',', '.') . ' K</div>';
        echo '</div>';
    }
    
    echo '</div>';
    
    echo '<div class="botoes">';
    echo '<a href="temperatura.php" class="botao">Nova Conversão</a>';
    echo '<a href="index.php" class="botao">Voltar ao Menu</a>';
    echo '</div>';
} else {
    // Exibir o formulário
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <div class="form-group">
        <label for="temperatura">Temperatura:</label>
        <input type="number" id="temperatura" name="temperatura" step="any" required>
    </div>
    
    <div class="form-group">
        <label for="escala">Escala de entrada:</label>
        <select id="escala" name="escala" required>
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
        </select>
    </div>
    
    <button type="submit">Converter</button>
</form>

<a href="index.php" class="voltar">← Voltar ao Menu</a>

<?php
}
include './partials/footer.php';
?>
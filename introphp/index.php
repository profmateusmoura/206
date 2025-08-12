<?php
$title = "Menu de Scripts";
$h1 = "Menu de Scripts";
include './partials/header.php';
?>

<div class="menu">
    <div class="menu-item">
        <h2>Verificador de Eleitor</h2>
        <p>Insira nome, idade e email para verificar se é eleitor obrigatório, facultativo ou não eleitor.</p>
        <a href="eleitor.php" class="menu-link">Acessar</a>
    </div>
    
    <div class="menu-item">
        <h2>Calculadora Completa</h2>
        <p>Calculadora que realiza as 4 operações básicas de uma só vez.</p>
        <a href="calculadora.php" class="menu-link">Acessar</a>
    </div>
    
    <div class="menu-item">
        <h2>Conversor de Temperatura</h2>
        <p>Converta temperaturas entre diferentes escalas (Celsius, Fahrenheit, Kelvin).</p>
        <a href="temperatura.php" class="menu-link">Acessar</a>
    </div>
    
    <div class="menu-item">
        <h2>Verificador de Notas</h2>
        <p>Insira três notas e descubra a situação do aluno: reprovado, em estudos orientados ou aprovado.</p>
        <a href="notas.php" class="menu-link">Acessar</a>
    </div>
    
    <div class="menu-item">
        <h2>Sequência de Fibonacci</h2>
        <p>Gere a sequência de Fibonacci até o número de termos desejado.</p>
        <a href="fibonacci.php" class="menu-link">Acessar</a>
    </div>
    
    <div class="menu-item">
        <h2>Música dos Patinhos</h2>
        <p>Gere a letra da música "N Patinhos Foram Passear" com animação temporizada.</p>
        <a href="patinhos.php" class="menu-link">Acessar</a>
    </div>
</div>

<?php include './partials/footer.php'; ?>
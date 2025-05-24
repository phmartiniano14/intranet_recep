<?php
// Dados de conexão
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "nome_do_banco";

// Criar conexão
$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Checar conexão
if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}

// Definir charset (opcional, mas recomendado)
$conexao->set_charset("utf8");

// echo "Conexão bem-sucedida!";
?>

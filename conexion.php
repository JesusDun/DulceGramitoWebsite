<?php
$host = "46.28.42.226";
$user = "u760464709_23005283_usr";
$password = "rnUxcf3P#a";
$dbname = "u760464709_23005283_bd";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>

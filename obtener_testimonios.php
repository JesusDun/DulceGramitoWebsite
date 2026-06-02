<?php
require 'conexion.php';
header('Content-Type: application/json');

// Obtener los testimonios ordenados por los más recientes
$stmt = $conn->prepare("SELECT nombre, comentario, fecha FROM cakezone_testimonios ORDER BY fecha DESC");
$stmt->execute();
$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultados);
?>

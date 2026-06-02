<?php
require 'conexion.php';
header('Content-Type: application/json');

// Leer los datos JSON que envía el Fetch API
$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['nombre']) && isset($data['comentario'])) {
    $nombre = $data['nombre'];
    $comentario = $data['comentario'];

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO cakezone_testimonios (nombre, comentario) VALUES (:nombre, :comentario)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':comentario', $comentario);

    if($stmt->execute()) {
        echo json_encode(['exito' => true, 'mensaje' => 'Testimonio guardado correctamente']);
    } else {
        echo json_encode(['exito' => false, 'mensaje' => 'Error al guardar el testimonio']);
    }
} else {
    echo json_encode(['exito' => false, 'mensaje' => 'Por favor completa todos los campos']);
}
?>

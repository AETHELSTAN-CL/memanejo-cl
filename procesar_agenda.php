<?php
require_once 'conexion.php';

// Recibir y sanitizar datos del formulario
$nombre = isset($_POST['nombre']) ? $conn->real_escape_string(trim($_POST['nombre'])) : '';
$telefono = isset($_POST['telefono']) ? $conn->real_escape_string(trim($_POST['telefono'])) : '';
$fecha = isset($_POST['fecha']) ? $conn->real_escape_string(trim($_POST['fecha'])) : '';
$hora = isset($_POST['hora']) ? $conn->real_escape_string(trim($_POST['hora'])) : '';
$duracion = isset($_POST['bloque']) ? (int)$_POST['bloque'] : 0;

if (empty($nombre) || empty($telefono) || empty($fecha) || empty($hora) || $duracion <= 0) {
    die("Faltan datos obligatorios.");
}

$sql = "INSERT INTO solicitudes_agenda (nombre, telefono, fecha, hora, duracion) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error en la preparación de la consulta: " . $conn->error);
}

$stmt->bind_param("ssssi", $nombre, $telefono, $fecha, $hora, $duracion);

if ($stmt->execute()) {
    
    echo "
    <div style='
      max-width: 500px;
      margin: 50px auto;
      padding: 2rem;
      background-color: #e6ffed;
      border: 2px solid #47c97f;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      color: #2e7d32;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);'>

      <h2 style='margin-bottom: 1rem;'>✅ ¡Solicitud recibida!</h2>
      <p>Gracias <strong>$nombre</strong>, hemos recibido tu solicitud para una clase el <strong>$fecha</strong> a las <strong>$hora</strong>.</p>
      <p>Nos pondremos en contacto contigo al <strong>$telefono</strong>.</p>
    </div>
    ";
} else {
    echo "Error al enviar la solicitud: " . $stmt->error;
}

// ✉️ Enviar correo
$to = "leonardo.azo@memanejo.cl";
$subject = "Nueva solicitud de clase agendada";
$message = "
<html>
<head><title>Solicitud de Clase</title></head>
<body>
  <h2>Nueva Solicitud de Clase</h2>
  <p><strong>Nombre:</strong> $nombre</p>
  <p><strong>Teléfono:</strong> $telefono</p>
  <p><strong>Fecha:</strong> $fecha</p>
  <p><strong>Hora:</strong> $hora</p>
  <p><strong>Duración:</strong> $duracion horas</p>
</body>
</html>
";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: leonardo.azo@memanejo.cl\r\n";

mail($to, $subject, $message, $headers);

// Cerrar
$stmt->close();
$conn->close();
?>